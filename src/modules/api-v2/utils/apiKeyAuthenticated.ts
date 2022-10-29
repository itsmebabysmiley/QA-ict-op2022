import type { NextApiRequest, NextApiResponse } from 'next'

export const apiKeyAuthenticated = (
  req: NextApiRequest,
  _: NextApiResponse
) => {
  return new Promise<[boolean, boolean]>((resolve, reject) => {
    const apiKey = process.env.API_KEY
    const superPrivilegedApiKey = process.env.SUPER_PRIVILEGED_API_KEY

    if (!apiKey || !superPrivilegedApiKey) {
      return reject(new Error('API_KEY is not defined'))
    }

    const reqApiKey = req.query.apiKey || req.headers['x-ict-api-key']

    let isSuperPrivileged = false
    let isAuthorized = false

    if (reqApiKey === apiKey || reqApiKey === superPrivilegedApiKey) {
      if (reqApiKey === apiKey) {
        isAuthorized = true
      }

      if (reqApiKey === superPrivilegedApiKey) {
        isAuthorized = true
        isSuperPrivileged = true
      }

      return resolve([isAuthorized, isSuperPrivileged])
    }

    reject(new Error('Unauthorized'))
  })
}
