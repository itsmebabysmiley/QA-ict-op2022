import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '~/utils/iconify.ts'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
