import type { NextApiRequest, NextApiResponse } from 'next'
import dayjs from '~/utils/dayjs'
import Participant from '~/modules/mongoose/models/participant.model'
import Provinces from '~/const/register/province'

/**
 * จำนวนผู้เข้าร่วมแบ่งตามจังหวัด
 * {
 *   "Province" : "XX",
 *   "Amount" : 0,
 *   "Date" : "yyyy-MM-dd"
 * }
 */

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const g = await Participant.find({})

    const b = g.reduce((acc, cur) => {
      const date = dayjs.tz(cur.createdAt).format('YYYY-MM-DD')
      const province =
        Provinces.find((x) => x.province_id === cur.province)?.value ||
        'ไม่ระบุ'

      const found = acc.find((x) => x.Province === province && x.Date === date)

      if (found) {
        found.Amount += 1
      } else {
        acc.push({
          Province: province,
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
    payload: 'Method Not Allowed',
  })
}

export default API
