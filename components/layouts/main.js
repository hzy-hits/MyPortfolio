import Head from 'next/head'
import dynamic from 'next/dynamic'
import SpinningCube from '../spinning_cube/spining_cube.js'
import NavBar from '../navgabar.js'
import { Flex } from '@chakra-ui/react'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'


const Main = ({ children, router }) => {
    const bgColor = useColorModeValue('#f0e7db', '#202023')
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Zhenyu Huang - Homepage</title>
            </Head>
            <NavBar path={router.asPath} />
            <Container maxW="container.md" pt={14}>


                {children}
            </Container >
        </Box >
    )
}
export default Main
