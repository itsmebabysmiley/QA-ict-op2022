import type { WebhookEvent } from '@line/bot-sdk'
import { beaconHandler } from './beacon/handler'

export const eventHandler = async (webhookEvent: WebhookEvent) => {
  if (webhookEvent.type === 'beacon') {
    // Do Something
    await beaconHandler(webhookEvent)
  }
}
