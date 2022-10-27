import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import dayjs from '~/utils/dayjs'
import QuestLog from '~/modules/mongoose/models/questlog.model'
import dbConnect from '~/lib/mongoose/dbConnect'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'OPTIONS'],
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
 * จำนวนผู้ลงทะเบียนในแต่ละกิจกรรม
 * {
 *   "EventName" : "XX",
 *   "Amount" : 0,
 *   "Date" : "yyyy-MM-dd"
 * }
 */

export const API = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)
  await dbConnect()
  if (req.method === 'GET') {
    const g = await QuestLog.find({
      status: 'success',
    })

    console.log(g)

    const b = g.reduce((acc, cur) => {
      const date = dayjs.tz(cur.createdAt).format('YYYY-MM-DD')
      const eventName = `Quest ${cur.questNo}`

      const found = acc.find(
        (x) => x.EventName === eventName && x.Date === date
      )

      if (found) {
        found.Amount += 1
      } else {
        acc.push({
          EventName: eventName,
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

  return res.status(405).json({
    success: false,
    payload: {
      message: 'Method not allowed',
    },
  })
}

export default API
