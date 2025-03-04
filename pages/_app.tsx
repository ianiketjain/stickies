import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   document.body.style.margin = '0px' // Remove margins for full-screen UI
  //   document.body.style.height = '100vh'
  // }, [])

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Stickies - Combines notes with a smooth workflow.</title>
        <meta name="description" content="Stickies - Combines notes with a smooth workflow." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
