import axios from 'axios'
import { stringify } from 'qs'
import type { IVerifyIdTokenResponse } from '~/types/external/line'

interface IVerifyIdTokenUser {
  userId: string
  displayName: string
  picture: string
  email?: string
}

// Verify LINE Id Token
export const verifyIdToken = async (
  idToken: string
): Promise<[boolean, IVerifyIdTokenUser]> => {
  try {
    const { data } = await axios.post<IVerifyIdTokenResponse>(
      'https://api.line.me/oauth2/v2.1/verify',
      stringify({
        id_token: idToken,
        client_id: process.env.LINE_CLIENT_ID,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    console.log(data)

    return [
      true,
      {
        userId: data.sub,
        displayName: data.name,
        picture: data.picture,
        email: data.email,
      },
    ]
  } catch (error) {
    console.log(error)
    throw new Error('Invalid LINE Id Token')
  }
}
