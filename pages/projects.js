import React from 'react'
import { Box, Container, Flex, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const SpinningCube = dynamic(
  () => import('../components/spinning_cube/spining_cube.js'),
  {
    ssr: false
  }
)
const Projects = () => {
  const bgColor = useColorModeValue('#f0e7db', '#202023')
  return (
    <Container maxW="container.md" pt={14}>
      <Flex align="center" justify="center">
        <Box
          m="auto"
          mt={['-20px', '-50px', '-80px']}
          mb={['-40px', '-80px', '-120px']}
          w={[240, 400, 540]}
          h={[240, 480, 540]}
          position="relative"
          bg={bgColor}
        >
          <SpinningCube />
        </Box>
      </Flex>
    </Container>
  )
}
export default Projects
