import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
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

export default appWithTranslation(App)
