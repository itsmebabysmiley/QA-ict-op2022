import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/mongoose/dbConnect'
import QuestLog from '~/modules/mongoose/models/questlog.model'

/**
 * จำนวนผู้ลงทะเบียนในแต่ละกิจกรรม
 *
 * {
 *  "ProjectName": "XX",
 *  "Amount": 0,
 * }
 */

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()

  if (req.method === 'GET') {
    const d = await QuestLog.find({
      questNo: 5,
      status: 'success',
    })

    const b = d.reduce((acc, cur) => {
      const projectName = cur.answer?.[0]

      const found = acc.find((x) => x.ProjectName === projectName)

      if (found) {
        found.Amount += 1
      } else {
        acc.push({
          ProjectName: projectName,
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

  return res.status(405).json({ success: false, payload: 'Method Not Allowed' })
}

export default API
