import type { Model } from 'mongoose'
import { Schema, model, models } from 'mongoose'

export enum BeaconMessageSent {
  LA_WELCOME = 'la_welcome',
  MUICT_WELCOME = 'muict_welcome',
}

export enum BeaconEventType {
  ENTER = 'enter',
  LEAVE = 'leave',
  BANNER = 'banner',
  STAY = 'stay',
}

interface IBeaconLog {
  lineUId: string
  hwid: string
  type: BeaconEventType
  messageSent: BeaconMessageSent

  createdAt: Date
  updatedAt: Date
}

const beaconLogSchema = new Schema(
  {
    lineUId: String,
    hwid: String,
    type: {
      type: String,
      enum: Object.values(BeaconEventType),
    },
    messageSent: {
      type: String,
      enum: Object.values(BeaconMessageSent),
    },
  },
  { timestamps: true }
)

const BeaconLog: Model<IBeaconLog> =
  models.BeaconLog || model('BeaconLog', beaconLogSchema)

export default BeaconLog
