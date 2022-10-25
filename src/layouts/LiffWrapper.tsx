import type { ComponentProps, FC, Provider } from 'react'
import { LIFF_ID } from '~/const/liff'
import { LIFFProvider } from '~/context/liff/LIFFProvider'
import type { ILIFFContextType } from '~/context/liff/types'

type LiffWrapperProps = Pick<
  ComponentProps<Provider<ILIFFContextType>>,
  'children'
>

const LiffWrapper: FC<LiffWrapperProps> = ({ ...props }) => {
  return <LIFFProvider liffId={LIFF_ID} {...props} />
}

export default LiffWrapper
