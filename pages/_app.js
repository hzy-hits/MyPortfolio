import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import theme from '../lib/theme'
import Fonts from '../components/fonts'
import Layout from '../components/layouts/main'
import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Website Component={Component} pageProps={pageProps} router={router} />
      <Analytics />
    </ChakraProvider>
  )
}

function Website({ Component, pageProps, router }) {
  const { setColorMode } = useColorMode()

  useEffect(() => {
    const savedColorMode = localStorage.getItem('colorMode')
    if (savedColorMode) {
      setColorMode(savedColorMode)
    }
  }, [setColorMode])

  return (
    <Layout router={router}>
      <Component {...pageProps} key={router.route} />
    </Layout>
  )
}

export default MyApp
