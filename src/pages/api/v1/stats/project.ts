import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import dbConnect from '~/lib/mongoose/dbConnect'
import QuestLog from '~/modules/mongoose/models/questlog.model'

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
 *
 * {
 *  "ProjectName": "XX",
 *  "Amount": 0,
 * }
 */

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)
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
