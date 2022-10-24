import type { NextApiRequest, NextApiResponse } from 'next'
import { getQuestLogFromStatus } from '~/modules/api/services/activity/getQuestLogFromStatus'
import { getLineUserFromReq } from '~/modules/api/services/common/getLineUserFromReq'
import { getUserRecordFromLineUId } from '~/modules/api/services/common/getUserRecordFromLine'
import { QuestLogStatus } from '~/modules/mongoose/models/questlog.model'
import { QUEST_STATUS } from '~/types/api/activity'

const API = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const user = await getLineUserFromReq(req)
      const userRecord = await getUserRecordFromLineUId(user.userId)

      if (!userRecord) {
        throw new Error('Participant not found')
      }

      const quests = await getQuestLogFromStatus(
        userRecord.id,
        QuestLogStatus.SUCCESS
      )

      const questStatus = quests.map((q) => {
        return {
          questNo: q.questNo,
          status: QUEST_STATUS.SUCCESS_QUEST,
          timestamp: q.createdAt,
        }
      })

      return res.status(200).json({
        success: true,
        payload: {
          name: `${userRecord.firstName} ${userRecord.lastName}`,
          quests: questStatus,
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
