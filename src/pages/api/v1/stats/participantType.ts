import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/mongoose/dbConnect'
import Participant from '~/modules/mongoose/models/participant.model'

/**
 * จำนวนผู้เข้าร่วมตามประเภท
 * {
 *   "ParticipantType" : "XX",
 *   "Amount" : 0
 *   "Date" : "yyyy-MM-dd"
 * }
 */

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    if (req.method === 'GET') {
      const g = await Participant.find({})

      const b = g.reduce((acc, cur) => {
        const date = cur.createdAt.toISOString().split('T')[0]
        const participantType = cur.regType

        const found = acc.find(
          (x) => x.ParticipantType === participantType && x.Date === date
        )

        if (found) {
          found.Amount += 1
        } else {
          acc.push({
            ParticipantType: participantType,
            Amount: 1,
            Date: date,
          })
        }

        return acc
      }, [] as any[])

      return res.status(200).json({
        success: true,
        payload: b,
      })
    }

    return res
      .status(405)
      .json({ success: false, payload: 'Method Not Allowed' })
  } catch (error: any) {
    res.status(500).json({ success: false, payload: error.message })
  }
}

export default API
