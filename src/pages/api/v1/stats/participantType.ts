import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import dbConnect from '~/lib/mongoose/dbConnect'
import Participant from '~/modules/mongoose/models/participant.model'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

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
    await runMiddleware(req, res, cors)
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
