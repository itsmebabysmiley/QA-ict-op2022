import axios from 'axios'
import { stringify } from 'qs'
import type { IVerifyIdTokenResponse } from '~/types/external/line'

interface ILineUser {
  userId: string
  displayName: string
  picture: string
  email?: string
}

// Verify LINE Id Token
export const getLineUserFromIdToken = async (
  idToken: string
): Promise<ILineUser> => {
  try {
    const { data } = await axios.post<IVerifyIdTokenResponse>(
      'https://api.line.me/oauth2/v2.1/verify',
      stringify({
        id_token: idToken,
        client_id: process.env.LINE_LOGIN_CHANNEL_ID,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    return {
      userId: data.sub,
      displayName: data.name,
      picture: data.picture,
      email: data.email,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error_description ?? 'Unknown error')
    }
    throw new Error('Invalid LINE Id token')
  }
}
