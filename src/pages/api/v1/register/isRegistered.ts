import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/mongoose/dbConnect'
import isParticipantRegistered from '~/modules/api/services/register/isParticipantRegistered'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const { authorization } = req.headers
      const token = authorization?.split(/\s/g)[1]

      const isRegistered = token ? await isParticipantRegistered(token) : false

      return res.status(200).json({
        success: true,
        payload: {
          isRegistered,
        },
      })
    }

    return res
      .status(405)
      .json({ success: false, message: 'Method Not Allowed' })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export default API
