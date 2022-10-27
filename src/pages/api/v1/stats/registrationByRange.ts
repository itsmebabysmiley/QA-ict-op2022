import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import dayjs from '~/utils/dayjs'
import Registration from '~/modules/mongoose/models/registration.model'
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
 * จำนวนผู้ลงทะเบียนในแต่ละช่วงเวลา (ทุกๆ 1 ชั่วโมง ตั้งแต่เริ่ม จนถึงเวลาปัจจุบัน)
 * {
 *   "Date" : "yyyy-MM-dd",
 *   "TimeStart" : "hh:mm",
 *   "TimeEnd" : "hh:mm",
 *   "Amount" : 0
 * }
 */

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors)
    await dbConnect()
    if (req.method === 'GET') {
      const g = await Registration.find({})

      const b = g.reduce((acc, cur) => {
        const date = dayjs.tz(cur.createdAt).format('YYYY-MM-DD')

        const timeStartMinute = dayjs.tz(cur.createdAt).minute()
        const timeStartHour = dayjs.tz(cur.createdAt).hour()

        const minuteStart =
          timeStartMinute < 15
            ? '00'
            : timeStartMinute < 30
            ? '15'
            : timeStartMinute < 45
            ? '30'
            : '45'

        const minuteEnd =
          minuteStart === '45' ? '00' : parseInt(minuteStart) + 15

        const timeStart = `${timeStartHour}:${minuteStart}`
        const timeEnd = `${
          minuteEnd === '00' ? timeStartHour + 1 : timeStartHour
        }:${minuteEnd}`

        const found = acc.find(
          (x) =>
            x.Date === date &&
            x.TimeStart === timeStart &&
            x.TimeEnd === timeEnd
        )

        if (found) {
          found.Amount += 1
        } else {
          acc.push({
            Date: date,
            TimeStart: timeStart,
            TimeEnd: timeEnd,
            Amount: 1,
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
