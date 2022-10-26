import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import '~/utils/iconify.ts'
import { DefaultSeo } from 'next-seo'
import nextI18nConfig from '../../next-i18next.config'
import LIFFWrapper from '~/layouts/LiffWrapper'
import { Context } from '~/context/storeon'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo
        defaultTitle={'ICT Mahidol Open House 2022'}
        titleTemplate={'%s | ICT Mahidol Open House 2022'}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/static/images/favicon.svg',
            type: 'image/svg+xml',
          },
        ]}
      />
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

export default appWithTranslation(App, nextI18nConfig)
