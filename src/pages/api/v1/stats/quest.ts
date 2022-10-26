import type { NextApiRequest, NextApiResponse } from 'next'
import QuestLog from '~/modules/mongoose/models/questlog.model'

/**
 * จำนวนผู้ลงทะเบียนในแต่ละกิจกรรม
 * {
 *   "EventName" : "XX",
 *   "Amount" : 0,
 *   "Date" : "yyyy-MM-dd"
 * }
 */

export const API = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const g = await QuestLog.find({
      status: 'success',
    })

    console.log(g)

    const b = g.reduce((acc, cur) => {
      const date = new Date(cur.updatedAt).toISOString().split('T')[0]
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
