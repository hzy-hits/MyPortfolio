import { Container, Box, Heading } from '@chakra-ui/react'
import SpiningCube from '../components/spinning_cube/spining_cube.js'
const Page = () => {
  return (
    <Container>
      <SpiningCube />
      <Box broderRadius="lg" bg="green" p="5" mb={6} align="center">
        Hello, I&apos;m a computaional science master's student at Brown
        University, transitioning from physics with AI experience to pursue a
        career as a software development engineer.
      </Box>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Zhenyu Huang
          </Heading>
          <p>Developer with Physics Background</p>
        </Box>
      </Box>
    </Container>
  )
}

export default Page
