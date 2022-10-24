import Participant from '~/modules/mongoose/models/participant.model'

export const getUserRecordFromLineUId = async (
  uId: string,
  toThrow = false
) => {
  console.log('lineUserId', uId)

  const user = await Participant.findOne({ lineUserId: uId }).exec()
  if (!user && toThrow) {
    throw new Error('Participant not found')
  }
  return user
}
