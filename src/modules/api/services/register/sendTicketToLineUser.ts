import { FLEX_IG_FILTER, FLEX_TICKET_BUBBLE } from '~/const/line/flex-messages'
import { LINEClient } from '~/lib/line'
import type { IParticipant } from '~/modules/mongoose/models/participant.model'

export const sendTicketToLineUser = async (
  lineUid: string,
  profile: IParticipant
) => {
  await LINEClient.pushMessage(lineUid, [
    {
      type: 'text',
      text:
        profile.language === 'th'
          ? `ยินดีต้อนรับ ${profile.firstName} ${profile.lastName} สู่กิจกรรม MUICT Open House 2022`
          : `Welcome ${profile.firstName} ${profile.lastName} to MUICT Open House 2022`,
    },
    {
      type: 'flex',
      altText: 'Ticket',
      contents: FLEX_IG_FILTER(),
    },
    {
      type: 'flex',
      altText:
        profile.language === 'th'
          ? 'นี่คือตั๋วของคุณ ขอให้คุณสนุกกับการเข้าร่วมกิจกรรมมหิดลวิชาการ เปิดบ้านมหิดล 2565'
          : 'This is your ticket, Enjoy the ICT Mahidol Open House 2022',
      contents: FLEX_TICKET_BUBBLE(
        profile.lineDisplayName,
        profile.linePicture
      ),
    },
  ])
}
