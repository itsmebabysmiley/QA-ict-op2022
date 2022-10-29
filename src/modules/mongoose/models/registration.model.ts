import type { Document, Model } from 'mongoose'
import { Schema, model, models } from 'mongoose'
import type { IParticipant } from '~/types/entity/participant'

interface IRegistration extends Document {
  participant: IParticipant
  createdAt: Date
  updatedAt: Date
}

const registrationSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
    },
  },
  { timestamps: true }
)

const Registration: Model<IRegistration> =
  models.Registration || model('Registration', registrationSchema)

export default Registration
