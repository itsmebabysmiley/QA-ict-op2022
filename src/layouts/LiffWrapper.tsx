import type { ComponentProps, FC } from 'react'
import { LiffProvider } from 'react-liff'

type LiffWrapperProps = Pick<ComponentProps<typeof LiffProvider>, 'children'>

const LiffWrapper: FC<LiffWrapperProps> = ({ children }) => {
  return (
    <LiffProvider liffId={process.env.NEXT_PUBLIC_LIFF_ID ?? ''}>
      {children}
    </LiffProvider>
  )
}

export default LiffWrapper
