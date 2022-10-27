import Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/mongoose/dbConnect'
import { checkAnswer } from '~/modules/api/services/activity/checkAnswer'
import { getQuestQuestion } from '~/modules/api/services/activity/getQuestQuestion'
import { getLineUserFromReq } from '~/modules/api/services/common/getLineUserFromReq'
import { getUserRecordFromLineUId } from '~/modules/api/services/common/getUserRecordFromLine'
import QuestLog from '~/modules/mongoose/models/questlog.model'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    const body: {
      questionId: string
      questNo: number
      answer: string | string[]
    } = req.body

    await Joi.object({
      questionId: Joi.string().required(),
      questNo: Joi.number().required(),
      answer: Joi.string().required(),
    }).validateAsync(body)

    const lineUser = await getLineUserFromReq(req)
    const userRecord = await getUserRecordFromLineUId(lineUser.userId)

    if (!userRecord) {
      throw new Error('Participant not found')
    }

    if (req.method === 'POST') {
      const questions = await getQuestQuestion(
        body.questNo,
        undefined,
        true,
        true
      )

      const question = questions.find((q) => q.id === body.questionId)
      if (!question) {
        return res.status(404).json({
          error: 'Question not found',
        })
      }

      const result = checkAnswer(question.expectedAnswer, body.answer)

      if (result) {
        // Update user's quest progress
        await QuestLog.create({
          participant: userRecord._id,
          questNo: body.questNo,
          questionId: question.id,
          answer: Array.isArray(body.answer) ? body.answer : [body.answer],
          status: 'success',
        })
      } else {
        await QuestLog.create({
          participant: userRecord._id,
          questNo: body.questNo,
          questionId: question.id,
          status: 'incorrect',
        })
      }

      return res.status(200).json({ success: true, payload: { result } })
    }

    return res.status(405).json({
      error: 'Method not allowed',
    })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export default API
