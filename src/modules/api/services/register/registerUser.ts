import dbConnect from '~/lib/mongoose/dbConnect'
import { getLineUserFromIdToken } from '~/modules/external/line'
import Participant from '~/modules/mongoose/models/participant.model'
import Registration from '~/modules/mongoose/models/registration.model'
import type { IParticipant } from '~/types/entity/participant'

const registerUser = async (data: IParticipant, lineToken?: string) => {
  try {
    await dbConnect()

    const payload = {
      ...data,
    }

    if (lineToken) {
      const user = await getLineUserFromIdToken(lineToken)
      if (user) {
        Object.assign(payload, {
          lineUserId: user.userId,
          lineDisplayName: user.displayName,
          linePicture: user.picture,
        })
      }
    }

    const p = await Participant.create(payload)

    const checkInUser = await Registration.create({
      participant: p._id,
      registeredAt: new Date(),
    })

    return p
  } catch (error: any) {
    throw new Error(error)
  }
}

export default registerUser
