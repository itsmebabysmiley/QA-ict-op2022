import { getLineUserFromIdToken } from '~/modules/external/line'
import Participant from '~/modules/mongoose/models/participant.model'

const isParticipantRegistered = async (token?: string) => {
  try {
    if (!token) {
      return false
    }

    const [, user] = await getLineUserFromIdToken(token)
    const { userId } = user

    const p = await Participant.findOne({ lineUserId: userId })

    return !!p
  } catch (error: any) {
    throw new Error(error)
  }
}

export default isParticipantRegistered
