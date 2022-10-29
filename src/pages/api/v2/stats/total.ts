import type { NextApiRequest, NextApiResponse } from 'next'
import dayjs from '~/utils/dayjs'
import { getParticipants } from '~/modules/api-v2/usecases'
import { apiKeyAuthenticated } from '~/modules/api-v2/utils/apiKeyAuthenticated'
import { allowCors } from '~/modules/api-v2/utils/cors'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await allowCors(req, res)
    await apiKeyAuthenticated(req, res)

    const participants = await getParticipants()

    const payloadCount = participants.reduce(
      (acc, participant) => {
        const { createdAt } = participant
        const dateFormatted = dayjs.tz(createdAt).format('YYYY-MM-DD')

        if (!acc.date[dateFormatted]) {
          acc.date[dateFormatted] = 0
        }

        acc.date[dateFormatted] += 1

        acc.total += 1

        return acc
      },
      {
        total: 0,
        date: {},
      } as Record<string, number | Record<string, number>>
    )

    return res.status(200).json({
      success: true,
      payload: { ...payloadCount, timestamp: new Date().toISOString() },
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
}

export default API
