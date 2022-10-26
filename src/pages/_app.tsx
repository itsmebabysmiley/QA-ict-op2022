import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import '~/utils/iconify.ts'
import LIFFWrapper from '~/layouts/LiffWrapper'
import { Context } from '~/context/storeon'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* StoreOn Context */}
      <Context>
        {/* LIFF Wrapper */}
        <LIFFWrapper>
          <Component {...pageProps} />
        </LIFFWrapper>
      </Context>
    </>
  )
}

export default appWithTranslation(App)
