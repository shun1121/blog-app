import '../styles/globals.css'
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import type { AppProps } from 'next/app'
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MyApp
