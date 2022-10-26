import type { NextApiRequest, NextApiResponse } from 'next'
import dayjs from '~/utils/dayjs'
import Registration from '~/modules/mongoose/models/registration.model'

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
