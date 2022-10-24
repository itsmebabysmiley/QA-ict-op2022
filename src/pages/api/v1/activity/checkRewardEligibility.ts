import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/mongoose/dbConnect'
import { getQuestStatus } from '~/modules/api/services/activity/getQuestStatus'
import { getRewardEligibility } from '~/modules/api/services/activity/getRewardEligibility'
import { isRewardClaimed } from '~/modules/api/services/activity/isRewardClaimed'
import { getLineUserFromReq } from '~/modules/api/services/common/getLineUserFromReq'
import { getUserRecordFromLineUId } from '~/modules/api/services/common/getUserRecordFromLine'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    if (req.method === 'GET') {
      const user = await getLineUserFromReq(req)
      const userRecord = await getUserRecordFromLineUId(user.userId)

      if (!userRecord) {
        throw new Error('Participant not found')
      }

      const questStatus = await getQuestStatus(userRecord.id)
      const isEligible = await getRewardEligibility(questStatus)
      const isClaimed = await isRewardClaimed(userRecord.id)

      return res.status(200).json({
        success: true,
        payload: {
          isEligible,
          isClaimed,
        },
      })
    }
    return res.status(405).json({
      success: false,
      payload: {
        message: 'Method not allowed',
      },
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
}

export default API
