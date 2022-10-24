import type { Model } from 'mongoose'
import { Schema, model, models } from 'mongoose'
import type { IParticipant } from '~/types/entity/participant'

export enum QuestLogStatus {
  INCORRECT = 'incorrect',
  SUCCESS = 'success',
  INIT = 'init',
}

interface IQuestLog {
  participant: IParticipant
  questNo: number
  questionId?: string
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
