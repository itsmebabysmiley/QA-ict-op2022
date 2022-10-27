import type { NextApiRequest, NextApiResponse } from 'next'
import { LINEClient } from '~/lib/line'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(JSON.stringify(req.body, null, 2))

  const l = await LINEClient.getProfile(req.body.events[0].source.userId)
  console.log(JSON.stringify(l, null, 2))

  return res.status(200).json({
    success: true,
    payload: 'Hello World',
  })
}

export default API
