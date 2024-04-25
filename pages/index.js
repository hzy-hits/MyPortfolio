import _NextLink from 'next/link'
import { BioSection, BioYear } from '../components/bio'
import {
  _Link,
  Container,
  Heading,
  Box,
  _SimpleGrid,
  _Button,
  _List,
  _ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import Image from 'next/image'

//import SolarSystem from '../components/SolarSystem/getSolarSystem.js'

const Page = () => {
  return (
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="left"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hi, I&apos;m a computaional science master&apos;s student at Brown
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
        <Box
          flexshrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          align="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
            position="relative"
          >
            <Image
              src="/images/profile_kitty.JPG"
              alt="Profile image"
              objectFit="cover"
              overflow="hidden"
              layout="fill"
            />
          </Box>
        </Box>
      </Box>
      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>2000</BioYear>
          Born in Guangzhou (广州), China.
        </BioSection>
        <BioSection>
          <BioYear>2023</BioYear>
          Completed the Bachelor&apos;s Program in physics at Sun Yat-sen
          University (中山大学).
        </BioSection>
        <BioSection>
          <BioYear>2023 to present</BioYear>Pursuing a master&apos;s degree in
          computational science at Brown University.
        </BioSection>
      </Section>
      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>Zhenyu</Paragraph>
      </Section>
    </Container>
  )
}

export default Page
