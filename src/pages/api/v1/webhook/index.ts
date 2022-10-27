import type { NextApiResponse } from 'next'
import dbConnect from '~/lib/mongoose/dbConnect'
import type { LINENextApiRequest } from '~/modules/api/@types/webhookHandler'
import { eventHandler } from '~/modules/api/webhook/eventHandler'
import { verifyLineSignature } from '~/modules/api/webhook/verifyLineSignature'

const API = async (req: LINENextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    if (req.method !== 'POST') {
      res.status(405).json({
        success: false,
        payload:
          'Method Not Allowed, Please POST your request through LINE Messaging API',
      })
      return
    }

    const { body } = req

    for (const webhookEvent of body.events) {
      await eventHandler(webhookEvent)
    }

    return res.status(200).json({ success: true, payload: { message: 'ok' } })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
}

export default verifyLineSignature(API)
