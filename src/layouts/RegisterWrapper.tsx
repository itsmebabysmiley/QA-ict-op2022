import type { ComponentProps, FC } from 'react'
import useSWR from 'swr'
import { LIFF_STATE } from '~/context/liff/enum'
import { useLiff } from '~/context/liff/LIFFProvider'
import type { ApiResponseSuccess } from '~/types/api'
import { fetcher } from '~/utils'

const RegisterWrapper: FC<ComponentProps<'div'>> = () => {
  const { liff, state } = useLiff()
  const { data, error } = useSWR<ApiResponseSuccess<{ isRegistered: boolean }>>(
    [LIFF_STATE.READY, LIFF_STATE.READY_UNAUTHENTICATED].includes(state)
      ? {
          url: '/api/v1/register/isRegistered',
          method: 'GET',
          token: liff.getIDToken() ? liff.getIDToken() : undefined,
        }
      : null,
    fetcher
  )

  return <div></div>
}

export default RegisterWrapper
