import type { Model } from 'mongoose'
import { Schema, model, models } from 'mongoose'
import Participant from './participant.model'
import type { IParticipant } from '~/types/entity/participant'

interface IRegistration {
  participant: IParticipant
  registeredAt: Date
}

const registrationSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
    },
    registeredAt: Date,
  },
  { timestamps: true }
)

const Registration: Model<IRegistration> =
  models.Registration || model('Registration', registrationSchema)

export default Registration
