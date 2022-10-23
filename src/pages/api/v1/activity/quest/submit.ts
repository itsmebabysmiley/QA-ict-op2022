import Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'
import { QUESTIONS } from '~/const/activity/questions'
import { getQuestQuestion } from '~/modules/api/services/activity/getQuestQuestion'
import { randomArray } from '~/utils'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: {
      questionId: string
      questNo: number
      answer: string
    } = req.body

    await Joi.object({
      questionId: Joi.string().required(),
      questNo: Joi.number().required(),
      answer: Joi.string().required(),
    }).validateAsync(body)

    if (req.method === 'POST') {
      const questions = await getQuestQuestion(body.questNo, undefined, true)

      const question = questions.find((q) => q.id === body.questionId)
      if (!question) {
        return res.status(404).json({
          error: 'Question not found',
        })
      }

      const expectedAnswer = question.expectedAnswer
      const normalizedAnswer = body.answer.toLowerCase().trim()

      const isCorrect = Array.isArray(expectedAnswer)
        ? expectedAnswer.includes(normalizedAnswer)
        : expectedAnswer === normalizedAnswer

      return res
        .status(200)
        .json({ success: true, payload: { result: isCorrect } })
    }

    return res.status(405).json({
      error: 'Method not allowed',
    })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export default API
