import QuestLog, {
  QuestLogStatus,
} from '~/modules/mongoose/models/questlog.model'
import { questLists } from '~/const/activity/quests'
import { QUEST_STATUS } from '~/types/api/activity'

export interface IQuestStatus {
  questNo: number
  status: QUEST_STATUS
  timestamp?: Date
}

const STATUS_MAPPING: Record<string, QUEST_STATUS> = {
  [QuestLogStatus.SUCCESS]: QUEST_STATUS.SUCCESS_QUEST,
  [QuestLogStatus.INIT]: QUEST_STATUS.INIT_QUEST,
}

export const getQuestStatus = async (userId: string) => {
  const questLogs = await QuestLog.find({
    participant: userId,
    status: {
      $in: [QuestLogStatus.SUCCESS, QuestLogStatus.INIT],
    },
  })
    .sort({
      status: -1,
    })
    .exec()

  const questStatus = questLists.map((q) => {
    const questLog = questLogs.find((qLog) => qLog.questNo === q.questNo)
    if (!questLog) {
      return {
        questNo: q.questNo,
        status: QUEST_STATUS.NOT_STARTED,
      }
    }

    return {
      questNo: questLog.questNo,
      status: STATUS_MAPPING[questLog.status],
      timestamp: questLog.createdAt,
    }
  })

  return questStatus as IQuestStatus[]
}
