import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import dbConnect from '~/lib/mongoose/dbConnect'
import Evaluation from '~/modules/mongoose/models/evaluation.model'

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

const SCORE_MAP: Record<string, number> = {
  'strongly-agree': 5,
  agree: 4,
  neutral: 3,
  disagree: 2,
  'strongly-disagree': 1,
}

const cleanUpText = (text: string) => {
  return text.replace(/[^\u0E00-\u0E7Fa-zA-Z ]/g, '').toLowerCase()
}

export const API = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)
  await dbConnect()
  if (req.method === 'GET') {
    const g = await Evaluation.find({})

    // console.log(g)

    const ratingField = [
      'date-and-time-rating',
      'location-rating',
      'service-rating',
      'understanding-rating',
      'stage-rating',
      'booths-rating',
      'project-rating',
      'guidance-rating',
      'intl-exp-rating',
      'benefit-rating',
      'overall-rating',
      'interest-rating',
    ]

    const disticntEval = g.filter((value, index, self) => {
      return (
        self.findIndex(
          (v) => v.participant?.toString() === value.participant?.toString()
        ) === index || !value.participant
      )
    })

    const b = disticntEval.reduce((acc, cur) => {
      for (const key of Object.keys(cur.toJSON())) {
        if (key === '_id' || key === 'createdAt' || key === 'updatedAt') {
          continue
        }

        const c = cur as unknown as Record<string, any>

        if (Array.isArray(c[key])) {
          c[key].forEach((v: any) => {
            const value = v.trim()

            const cleanedKey = cleanUpText(value)

            // console.log(value, cleanedKey)

            if (!cleanedKey || cleanedKey === '') {
              return
            }

            acc[key] = acc[key] || {}
            acc[key][value] = acc[key][value] ? acc[key][value] + 1 : 1
          })
          continue
        }

        const cleanedKey =
          typeof c[key] === 'string' ? cleanUpText(c[key]) : c[key]

        console.log(key, cleanedKey)

        if (!cleanedKey || cleanedKey === '') {
          continue
        }

        const cleanedKeyForDisplay =
          typeof c[key] === 'string' ? c[key].trim() : c[key]

        acc[key] = acc[key] || {}
        acc[key][cleanedKeyForDisplay] = acc[key][cleanedKeyForDisplay] + 1 || 1
      }

      return acc
    }, {} as Record<string, Record<string, number>>)

    ratingField.forEach((field) => {
      const [noOfReply, score] = Object.entries(b[field]).reduce(
        (acc, [k, n]) => {
          if (k === 'n/a') {
            return acc
          }
          return [acc[0] + n, acc[1] + n * SCORE_MAP[k]]
        },
        [0, 0]
      )

      b[field].avg = score / noOfReply
    })

    delete b.participant
    delete b.__v

    return res.status(200).json({
      success: true,
      payload: {
        total: disticntEval.length,
        ...b,
      },
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
