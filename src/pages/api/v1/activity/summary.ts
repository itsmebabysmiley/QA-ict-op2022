import type { NextApiRequest, NextApiResponse } from 'next'

const API = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({})
}

export default API
