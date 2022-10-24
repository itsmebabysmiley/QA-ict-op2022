import { getQuestLogFromStatus } from './getQuestLogFromStatus'
import { QuestLogStatus } from '~/modules/mongoose/models/questlog.model'

export const isRewardClaimed = async (userId: string) => {
  const questLogs = await getQuestLogFromStatus(
    userId,
    QuestLogStatus.REWARD_CLAIM
  )

  const isRewardClaimed = questLogs.find(
    (q) => q.status === QuestLogStatus.REWARD_CLAIM
  )

  return !!isRewardClaimed
}
