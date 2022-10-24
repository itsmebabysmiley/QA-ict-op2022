import type { IQuestion } from '~/const/activity/questions'

export enum QUEST_STATUS {
  INIT_QUEST = 'INIT_QUEST',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS_QUEST = 'SUCCESS_QUEST',
}

export interface IQuestPayload {
  status: QUEST_STATUS
  question?: IQuestion
}
