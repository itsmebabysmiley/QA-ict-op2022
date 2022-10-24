import type { Model } from 'mongoose'
import { Schema, model, models } from 'mongoose'
import type { IParticipant } from '~/types/entity/participant'

enum QuestLogStatus {
  SUCCESS = 'success',
}

interface IQuestLog {
  participant: IParticipant
  questNo: number
  status: QuestLogStatus
  finishedAt: Date
}

const questLogSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
    },
    questNo: Number,
    status: {
      type: String,
      enum: Object.values(QuestLogStatus),
    },
    finishedAt: Date,
  },
  { timestamps: true }
)

const QuestLog: Model<IQuestLog> =
  models.QuestLog || model('QuestLog', questLogSchema)

export default QuestLog
