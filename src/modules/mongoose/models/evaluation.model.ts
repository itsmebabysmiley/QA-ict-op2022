import type { Model } from 'mongoose'
import { Schema, model, models } from 'mongoose'
import type { IParticipant } from '~/types/entity/participant'

interface IEvaluation {
  participant: IParticipant
  role: string
  gender: string
  channels: string[]
  'participated-activities': string[]
  'date-and-time-rating': string
  'location-rating': string
  'service-rating': string
  'understanding-rating': string
  'stage-rating': string
  'booths-rating': string
  'project-rating': string
  'guidance-rating': string
  'intl-exp-rating': string
  'benefit-rating': string
  'overall-rating': string
  'interest-rating': string
  'interested-programs': string[]
  factors: string[]
  impressed: string
  unimpressed: string
  'other-suggestions': string
  createdAt: Date
  updatedAt: Date
}

const evaluationSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
    },
    role: String,
    gender: String,
    channels: [String],
    'participated-activities': [String],
    'date-and-time-rating': String,
    'location-rating': String,
    'service-rating': String,
    'understanding-rating': String,
    'stage-rating': String,
    'booths-rating': String,
    'project-rating': String,
    'guidance-rating': String,
    'intl-exp-rating': String,
    'benefit-rating': String,
    'overall-rating': String,
    'interest-rating': String,
    'interested-programs': [String],
    factors: [String],
    impressed: String,
    unimpressed: String,
    'other-suggestions': String,
  },
  { timestamps: true }
)

const Evaluation: Model<IEvaluation> =
  models.Evaluation || model('Evaluation', evaluationSchema)

export default Evaluation
