import { sendTicketToLineUser } from './sendTicketToLineUser'
import dbConnect from '~/lib/mongoose/dbConnect'
import { getLineUserFromIdToken } from '~/modules/external/line'
import Participant from '~/modules/mongoose/models/participant.model'
import QuestLog from '~/modules/mongoose/models/questlog.model'
import Registration from '~/modules/mongoose/models/registration.model'
import type { IParticipant } from '~/types/entity/participant'
import { LINEClient } from '~/lib/line'
import { RICH_MENU_ID } from '~/const/line/rich-menu'

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

    console.log(payload)

    const p = await Participant.create(payload)

    console.log(p)

    // Create registration record
    await Registration.create({
      participant: p._id,
    })

    await QuestLog.create({
      participant: p._id,
      questNo: 1,
      status: 'success',
    })

    if (p.lineUserId) {
      // Send Ticket to LINE user
      await sendTicketToLineUser(p.lineUserId, p)

      // Set Registered Rich Menu
      await LINEClient.linkRichMenuToUser(p.lineUserId, RICH_MENU_ID.REGISTERED)
    }

    return p
  } catch (error: any) {
    throw new Error(error)
  }
}

export default registerUser
