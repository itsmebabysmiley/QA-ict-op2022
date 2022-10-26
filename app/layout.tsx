import type { FC, ReactNode } from 'react'
import '~/styles/globals.css'

const RootLayout: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <html>
      <head>
        <title>MUICT Open House 2022</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
