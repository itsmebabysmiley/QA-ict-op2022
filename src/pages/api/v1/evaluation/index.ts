import type { NextApiRequest, NextApiResponse } from 'next'
import submitEvaluation from '~/modules/api/services/evaluation/submitEvaluation'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authorization } = req.headers
      const token = authorization?.split(/\s/g)[1]

      const { body } = req
      await submitEvaluation(body, token)

      return res.status(200).json({ success: true, payload: 'OK' })
    }

    return res
      .status(405)
      .json({ success: false, payload: 'Method Not Allowed' })
  } catch (error: any) {
    res.status(500).json({ success: false, payload: error.message })
  }
}

export default API
