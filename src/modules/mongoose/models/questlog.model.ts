import type { Model } from 'mongoose'
import { Schema, model, models } from 'mongoose'
import type { IParticipant } from '~/types/entity/participant'

export enum QuestLogStatus {
  INCORRECT = 'incorrect',
  SUCCESS = 'success',
  INIT = 'init',
  REWARD_CLAIM = 'reward_claim',
}

interface IQuestLog {
  participant: IParticipant
  questNo: number
  questionId?: string
  answer?: string[]
  status: QuestLogStatus
  createdAt: Date
  updatedAt: Date
}

const questLogSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
    },
    questNo: Number,
    questionId: String,
    answer: [String],
    status: {
      type: String,
      enum: Object.values(QuestLogStatus),
    },
  },
  { timestamps: true }
)

const QuestLog: Model<IQuestLog> =
  models.QuestLog || model('QuestLog', questLogSchema)

export default QuestLog
