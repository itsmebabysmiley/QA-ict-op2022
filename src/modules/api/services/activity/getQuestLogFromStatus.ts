import type { QuestLogStatus } from '~/modules/mongoose/models/questlog.model'
import QuestLog from '~/modules/mongoose/models/questlog.model'

export const getQuestLogFromStatus = async (
  userId: string,
  status: QuestLogStatus
) => {
  const result = await QuestLog.find({
    participant: userId,
    status,
  }).exec()

  return result
}
