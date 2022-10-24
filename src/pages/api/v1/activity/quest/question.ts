import Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/mongoose/dbConnect'
import { getQuestLogFromQuestNo } from '~/modules/api/services/activity/getQuestLogFromQuestNo'
import { getQuestQuestion } from '~/modules/api/services/activity/getQuestQuestion'
import { getLineUserFromReq } from '~/modules/api/services/common/getLineUserFromReq'
import { getUserRecordFromLineUId } from '~/modules/api/services/common/getUserRecordFromLine'
import QuestLog from '~/modules/mongoose/models/questlog.model'
import { randomArray } from '~/utils'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      await dbConnect()

      const { query } = req

      await Joi.object({
        questNo: Joi.string().required(),
        lang: Joi.string().valid('th', 'en').optional(),
      }).validateAsync(query)

      const { questNo, lang = 'th' } = query as {
        questNo: string
        lang: 'th' | 'en'
      }

      if (!questNo) {
        return res.status(400).json({
          message: 'Missing id',
        })
      }

      const user = await getLineUserFromReq(req)
      const userRecord = await getUserRecordFromLineUId(user.userId)

      if (!userRecord) {
        throw new Error('Participant not found')
      }

      const questLog = await getQuestLogFromQuestNo(
        userRecord.id,
        Number(questNo)
      )

      const questions = await getQuestQuestion(Number(questNo), lang, true)

      const initQuestLog = questLog.find((q) => q.status === 'init')
      const successQuestLog = questLog.find((q) => q.status === 'success')

      // If user has finished the quest, return the success message
      if (successQuestLog) {
        return res.status(200).json({
          success: true,
          payload: {
            status: 'SUCCESS_QUEST',
          },
        })
      }

      // If user has not started the quest yet
      if (!initQuestLog) {
        const randomQuestion = randomArray(questions)

        await QuestLog.create({
          participant: userRecord._id,
          questNo: Number(questNo),
          questionId: randomQuestion.id,
          status: 'init',
        })

        return res.status(200).json({
          success: true,
          payload: {
            status: 'INIT_QUEST',
            question: randomQuestion,
          },
        })
      }

      const question = questions.find((q) => q.id === questLog[0].questionId)
      return res.status(200).json({
        success: true,
        payload: {
          status: 'IN_PROGRESS',
          question,
        },
      })
    }

    return res.status(405).json({
      error: 'Method not allowed',
    })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export default API
