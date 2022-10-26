import { getUserRecordFromLineUId } from '../common/getUserRecordFromLine'
import dbConnect from '~/lib/mongoose/dbConnect'
import { getLineUserFromIdToken } from '~/modules/external/line'
import QuestLog from '~/modules/mongoose/models/questlog.model'
import type { IParticipant } from '~/types/entity/participant'
import Evaluation from '~/modules/mongoose/models/evaluation.model'

const submitEvaluation = async (data: IParticipant, lineToken?: string) => {
  try {
    await dbConnect()

    const payload = {
      ...data,
    }

    if (lineToken) {
      const user = await getLineUserFromIdToken(lineToken)
      const userRecord = await getUserRecordFromLineUId(user.userId)

      if (userRecord) {
        Object.assign(payload, {
          participant: userRecord._id,
        })
      }
    }

    const p = await Evaluation.create(payload)

    await QuestLog.create({
      participant: p.participant,
      questNo: 6,
      status: 'success',
    })

    return p
  } catch (error: any) {
    throw new Error(error)
  }
}

export default submitEvaluation
