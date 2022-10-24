import type { QUEST_STATUS } from './activity'

export interface IQuestProgress {
  questNo: number
  status: QUEST_STATUS
  timestamp: number
}

export interface IMeProfilePayload {
  name: string
  quests: IQuestProgress[]
}
