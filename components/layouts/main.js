import Head from 'next/head'
import NavBar from '../navgabar.js'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import Footer from '../footer.js'

const Main = ({ children, router }) => {
  const _bgColor = useColorModeValue('#f0e7db', '#202023')
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Zhenyu Huang - Homepage</title>
      </Head>
      <NavBar path={router.asPath} />
      <Container maxW="container.md" pt={14}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}
export default Main
