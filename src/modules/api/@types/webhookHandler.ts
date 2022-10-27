import type { WebhookRequestBody } from '@line/bot-sdk'
import type { NextApiRequest } from 'next'

export interface LINENextApiRequest extends NextApiRequest {
  headers: NextApiRequest['headers'] & {
    'x-line-signature'?: string
  }
  body: WebhookRequestBody
}
