import type { NextApiRequest } from 'next'
import { getLineUserFromIdToken } from '~/modules/external/line'

export const getLineUserFromReq = async (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw new Error('No LINE Id token provided')
  }

  const user = await getLineUserFromIdToken(token)

  return user
}
