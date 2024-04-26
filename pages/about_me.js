import Section from '../components/section'
import Paragraph from '../components/paragraph'
import Image from 'next/image'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BioYear } from '../components/bio'
import {
    Link,
    Stack,
    Text,
    Flex,
    VStack,
    HStack,
    IconButton,
    Container,
    Heading,
    Box,
    _SimpleGrid,
    Button,
    _List,
    _ListItem,
    useColorModeValue
} from '@chakra-ui/react'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5'
import { IoIosMail, } from 'react-icons/io'


const EducationEntry = ({ schoolName, program, period, logoUrl }) => {
    const bgColor = useColorModeValue('#f0e7db', '#202023');
    const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
    const _borderColor = useColorModeValue('gray.300', 'gray.600');
    const _textStyle = {
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        fontWeight: "normal",
    };

    return (<VStack
        align="stretch"
        p={2}
        mb={4}
        background={bgColor}
        borderRadius="lg"
        textAlign="center"
        spacing={2}
    >
        <Heading as="h3" size="md" color={textColor} >
            {program} - {schoolName}
        </Heading>
        <HStack justify="space-between" align="center" width="full">
            <Link href={schoolName === "Brown University" ? "https://www.brown.edu/" : "https://www.sysu.edu.cn/"} isExternal>
                <Image src={logoUrl} alt={`${schoolName} logo`} width="100" height="100" layout="intrinsic" background={bgColor} />
            </Link>
            <BioYear>
                {period}
            </BioYear>

        </HStack>
    </VStack>
    );
};






const AboutMe = () => {
    return (
        <Container>
            <Flex direction={['column', 'row']} mt={20}>
                <Box flexGrow={1} mb={[5, 0]}>
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
                        <Box align="center" my={1}>
                            <a href="/resume_temp.pdf" target="_blank" rel="noopener noreferrer">
                                <Button
                                    rightIcon={<ChevronRightIcon />}
                                    colorScheme="teal"
                                >
                                    Resume
                                </Button>
                            </a>
                        </Box>
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
            </Flex>
            <Section delay={0.2}>
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
            </Section>
            <Section delay={0.3}>
                <Heading as="h3" variant="section-title">
                    Education
                </Heading>

                <EducationEntry
                    schoolName="Brown University"
                    program="MSc in Computational Science"
                    period="2023 - present"
                    logoUrl="/images/brown.png"
                />
                <EducationEntry
                    schoolName="Sun Yat-sen University"
                    program="BSc in Physics"
                    period="2019 - 2023"
                    logoUrl="/images/sysu_logo.png"
                />
            </Section>
            <Section delay={0.2}>
                <Heading as="h3" variant="section-title">
                    Reseach and Work Experience
                </Heading>
                <Paragraph>TBD</Paragraph>
            </Section>
        </Container>
    )
}

export default AboutMe
