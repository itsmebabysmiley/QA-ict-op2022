import dbConnect from '~/lib/mongoose/dbConnect'
import { verifyIdToken } from '~/modules/external/line'
import Participant from '~/modules/mongoose/models/participant.model'
import type { IParticipant } from '~/types/entity/participant'

const registerUser = async (data: IParticipant, lineToken?: string) => {
  try {
    await dbConnect()

    const payload = {
      ...data,
    }

    if (lineToken) {
      const [verified, user] = await verifyIdToken(lineToken)
      if (verified) {
        Object.assign(payload, {
          lineUserId: user.userId,
          lineDisplayName: user.displayName,
          linePicture: user.picture,
        })
      }
    }

    const p = Participant.create(payload)

    return p
  } catch (error: any) {
    throw new Error(error)
  }
}

export default registerUser
