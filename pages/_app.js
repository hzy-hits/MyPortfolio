import { ChakraProvider } from '@chakra-ui/react'
import theme from '../lib/theme'
import Fonts from '../components/fonts'
import Layout from '../components/layouts/main'

import { Analytics } from '@vercel/analytics/react'
const Website = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
        <Analytics />
      </Layout>
    </ChakraProvider>
  )
}
export default Website
