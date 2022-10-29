import type { NextApiRequest, NextApiResponse } from 'next'
import { getParticipants } from '~/modules/api-v2/usecases'
import { apiKeyAuthenticated } from '~/modules/api-v2/utils/apiKeyAuthenticated'
import { allowCors } from '~/modules/api-v2/utils/cors'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await allowCors(req, res)
    const [, isSuperPrivileged] = await apiKeyAuthenticated(req, res)

    const participants = await getParticipants()

    const eduLevel = participants.reduce((acc, participant) => {
      const { educationLevel } = participant

      if (!acc[educationLevel]) {
        acc[educationLevel] = {
          level: educationLevel,
          count: 0,
          participants: isSuperPrivileged ? [] : undefined,
        }
      }

      isSuperPrivileged && acc[educationLevel].participants.push(participant)
      acc[educationLevel].count += 1

      return acc
    }, {} as Record<string, number>)

    return res.status(200).json({
      success: true,
      payload: [...Object.values(eduLevel).sort((a, b) => b.count - a.count)],
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
