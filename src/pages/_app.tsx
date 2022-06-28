import '../styles/globals.css'
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_package/site.webmanifest" />
        <link rel="mask-icon" href="/favicon_package/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <MantineProvider
        theme={{
          colorScheme,
          colors: {
            // override dark colors to change them for all components
            dark: [
              '#d5d7e0',
              '#acaebf',
              '#8c8fa3',
              '#666980',
              '#4d4f66',
              '#34354a',
              '#2b2c3d',
              '#1d1e30',
              '#0c0d21',
              '#01010a',
            ],
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MyApp
