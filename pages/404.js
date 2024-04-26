import {
  Container,
  Heading,
  Text,
  Divider,
  Box,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import NextLink from 'next/link'

const NotFound = () => {
  return (
    <Container>
      <Box
        position="relative"
        zIndex="99"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        p={5}
        borderRadius="lg"
        css={{
          backdropFilter: 'blur(10px)'
        }}
      >
        <Heading as="h1">Not found</Heading>
        <Text>The page you&apos;re looking for was not found.</Text>
        <Divider my={6} />
        <Box my={6} align="center">
          <Button as={NextLink} href="/about_me" colorScheme="teal">
            Return to home
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
export default NotFound
