import Section from '../components/section'
import Paragraph from '../components/paragraph'
import Image from 'next/image'
import _NextLink from 'next/link'
import { BioSection, BioYear } from '../components/bio'
import {
  Link,
  Stack,
  Text,
  IconButton,
  Container,
  Heading,
  Box,
  _SimpleGrid,
  _Button,
  _List,
  _ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5'
import { IoIosMail } from 'react-icons/io'

const AboutMe = () => {
  return (
    <Container>
      <Box mt={20} display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Zhenyu Huang
          </Heading>
          <p>Developer with Physics Background</p>
          <Stack direction={'row'} spacing={4} justify="left" mt={3}>
            <Link
              href="https://www.linkedin.com/in/zhenyu-huang-64b0a8264/"
              isExternal
            >
              <IconButton
                aria-label="LinkedIn"
                variant="ghost"
                colorScheme="teal"
                icon={<IoLogoLinkedin />}
                size="lg"
              />
            </Link>
            <Link href="https://github.com/hzy-hits" isExternal>
              <IconButton
                aria-label="GitHub"
                variant="ghost"
                colorScheme="teal"
                icon={<IoLogoGithub />}
                size="lg"
              />
            </Link>
            <Link href="mailto:huangzhy77@outlook.com" isExternal>
              <IconButton
                aria-label="EMail"
                variant="ghost"
                colorScheme="teal"
                icon={<IoIosMail />}
                size="lg"
              />
            </Link>
          </Stack>
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
          About Me
        </Heading>

        <Box
          borderRadius="lg"
          mb={6}
          p={3}
          textAlign="left"
          colorScheme={useColorModeValue('gray', 'whiteAlpha')}
        >
          <Text fontSize="lg" mb={2} fontWeight="bold">
            - CS master student at Brown University.
          </Text>
          <Text fontSize="lg" mb={2} fontWeight="bold">
            - Background in physics with AI experience.
          </Text>
          <Text fontSize="lg" mb={2} fontWeight="bold">
            - Aspiring full-stack software development engineer.
          </Text>
        </Box>

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

export default AboutMe
