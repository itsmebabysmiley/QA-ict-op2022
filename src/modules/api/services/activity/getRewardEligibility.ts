import type { IQuestStatus } from './getQuestStatus'
import { QUEST_STATUS } from '~/types/api/activity'

export const getRewardEligibility = async (questStatus: IQuestStatus[]) =>
  questStatus.every((q) => q.status === QUEST_STATUS.SUCCESS_QUEST)
