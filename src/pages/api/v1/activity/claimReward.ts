import type { NextApiRequest, NextApiResponse } from 'next'
import { BASE_URL } from '~/const/config'
import { LINEClient } from '~/lib/line'
import dbConnect from '~/lib/mongoose/dbConnect'
import { getQuestStatus } from '~/modules/api/services/activity/getQuestStatus'
import { getRewardEligibility } from '~/modules/api/services/activity/getRewardEligibility'
import { isRewardClaimed } from '~/modules/api/services/activity/isRewardClaimed'
import { getLineUserFromReq } from '~/modules/api/services/common/getLineUserFromReq'
import { getUserRecordFromLineUId } from '~/modules/api/services/common/getUserRecordFromLine'
import QuestLog, {
  QuestLogStatus,
} from '~/modules/mongoose/models/questlog.model'

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
      const eligibleForReward = await getRewardEligibility(questStatus)
      const isClaimed = await isRewardClaimed(userRecord.id)

      if (!eligibleForReward || isClaimed) {
        return res.status(400).json({
          success: true,
          payload: {
            isEligible: false,
            isClaimed,
          },
        })
      }

      await QuestLog.create({
        participant: userRecord.id,
        questNo: 0,
        status: QuestLogStatus.REWARD_CLAIM,
      })

      // Unlink Rich Menu
      await LINEClient.unlinkRichMenuFromUser(user.userId)

      // Send some message
      await LINEClient.pushMessage(user.userId, [
        {
          type: 'imagemap',
          baseUrl: `${BASE_URL}/static/line/images/op-thankyou`,
          altText: 'Thank you for joining the event!',
          baseSize: {
            width: 1040,
            height: 1749.65,
          },
          actions: [],
        },
        {
          type: 'text',
          text: 'ติดตามพวกเราได้ที่\n\nFacebook: fb.com/ict.mahidol.university\nInstagram: instagram.com/ict_mahidol\nTwitter: twitter.com/ict_mahidol\nYouTube: youtube.com/ICTMahidol\nWebsite: ict.mahidol.ac.th\n',
        },
      ])

      return res.status(200).json({
        success: true,
        payload: {
          message: 'Reward claimed',
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
