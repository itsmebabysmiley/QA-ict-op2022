import type { NextApiRequest, NextApiResponse } from 'next'
import { getParticipants } from '~/modules/api-v2/usecases'
import { apiKeyAuthenticated } from '~/modules/api-v2/utils/apiKeyAuthenticated'
import { allowCors } from '~/modules/api-v2/utils/cors'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await allowCors(req, res)
    const [, isSuperPrivileged] = await apiKeyAuthenticated(req, res)

    if (!isSuperPrivileged) {
      throw new Error('Only super privileged API key is allowed')
    }

    const participants = await getParticipants()

    return res.status(200).json({ success: true, payload: participants })
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
