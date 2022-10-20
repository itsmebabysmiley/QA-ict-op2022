import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '~/utils/iconify.ts'

import LiffWrapper from '~/layouts/LiffWrapper'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <LiffWrapper>
        <Component {...pageProps} />
      </LiffWrapper>
    </>
  )
}

export default App
