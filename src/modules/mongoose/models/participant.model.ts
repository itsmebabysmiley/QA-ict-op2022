import type { Model } from 'mongoose'
import { Schema, model, models } from 'mongoose'

interface IParticipant {
  regType: string
  language: string
  firstName: string
  lastName: string
  dob: Date
  email: string
  phone: string
  province: string
  school: string
  educationLevel: string

  lineUserId: string
  lineDisplayName: string
  linePicture: string
}

const participantSchema = new Schema({
  regType: String,
  language: String,
  firstName: String,
  lastName: String,
  dob: Date,
  email: String,
  phone: String,
  province: Number,
  school: String,
  educationLevel: Number,

  // LINE
  lineUserId: String,
  lineDisplayName: String,
  linePicture: String,
})

const Participant: Model<IParticipant> =
  models.Participant || model('Participant', participantSchema)

export default Participant
