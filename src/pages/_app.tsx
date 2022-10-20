import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import '~/utils/iconify.ts'
import LiffWrapper from '~/layouts/LiffWrapper'
import { Context } from '~/context/storeon'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Context>
        <LiffWrapper>
          <Component {...pageProps} />
        </LiffWrapper>
      </Context>
    </>
  )
}

export default appWithTranslation(App)
