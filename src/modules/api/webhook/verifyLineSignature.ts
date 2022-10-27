import { validateSignature } from '@line/bot-sdk'
import type { NextApiHandler, NextApiResponse } from 'next'
import type { LINENextApiRequest } from '../@types/webhookHandler'

export const verifyLineSignature =
  (handler: NextApiHandler) =>
  async (req: LINENextApiRequest, res: NextApiResponse) => {
    const { method, headers, body } = req
    if (method !== 'POST') {
      res.status(405).json({
        success: false,
        payload:
          'Method Not Allowed, Please POST your request through LINE Messaging API',
      })
      return
    }

    if (headers['x-line-signature'] === undefined) {
      console.log('[ERROR] No x-line-signature header found.')
      res.status(400).json({
        success: false,
        payload:
          'Missing X-Line-Signature header, Please POST your request through LINE Messaging API',
      })
      return
    }

    const signature = headers['x-line-signature']
    const isSignatureValid = validateSignature(
      JSON.stringify(body),
      process.env.LINE_MESSAGING_API_CHANNEL_SECRET || '',
      signature
    )

    if (!isSignatureValid) {
      console.log('[ERROR] Invalid signature.')
      res.status(400).json({
        success: false,
        payload:
          'Invalid signature, Please POST your request through LINE Messaging API',
      })
      return
    }

    console.log('[INFO] Signature is valid.')

    return handler(req, res)
  }
