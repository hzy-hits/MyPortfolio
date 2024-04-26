import dynamic from 'next/dynamic'
import { Container, Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useColorMode } from '@chakra-ui/react'
const SolarSystem = dynamic(
  () => import('../components/SolarSystem/getSolarSystem.js'),
  {
    ssr: false
  }
)
//import SolarSystem from '../components/SolarSystem/getSolarSystem.js'

const Page = () => {
  const { colorMode, setColorMode } = useColorMode()
  useEffect(() => {
    if (colorMode !== 'dark') {
      setColorMode('dark')
    }
  }, [colorMode, setColorMode])
  return (
    <Container
      maxW="100vw"
      maxH="100vh"
      p={0}
      centerContent
      padding="0"
      margin="0"
    >
      <Box w="100%" h="100%" position="absolute" top="0" left="0" zIndex="-1">
        <SolarSystem />
      </Box>
    </Container>
  )
}

export default Page
