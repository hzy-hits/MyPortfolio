import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Box } from '@chakra-ui/react'
const SolarSystem = dynamic(
  () => import('../components/SolarSystem/getSolarSystem'),
  {
    ssr: false
  }
)
const Test = () => {
  ;<Container>
    <Box zIndex={99}>
      <SolarSystem />
    </Box>
  </Container>
}
export default Test
