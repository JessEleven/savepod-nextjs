import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
// @ts-expect-error
import '../resources/globals.css'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'savepod',
  description: 'savepod created with next.js',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body
        className={`${roboto.className}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
