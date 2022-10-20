import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '~/utils/iconify.ts'
import { LiffProvider } from 'react-liff'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <LiffProvider liffId={process.env.NEXT_PUBLIC_LIFF_ID ?? ''}>
        <Component {...pageProps} />
      </LiffProvider>
    </>
  )
}

export default App
