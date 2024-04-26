import React from 'react'
import Link from 'next/link'
import { Box, Container, Flex, useColorModeValue, SimpleGrid, Heading } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { WorkGridItem } from '../components/grid-items'
import Section from '../components/section'
import MyWebDemo from '../public/projects_demo/MyWeb.png'
import Weenix from '../public/projects_demo/Weenix.png'
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
                    w={[240, 320, 400]}
                    h={[240, 320, 400]}
                    position="relative"
                    bg={bgColor}
                >
                    <SpinningCube />
                </Box>
            </Flex>
            <Box>
                <Heading as="h3" fontSize={28} mb={4}>
                    Projects
                </Heading>
            </Box>
            <SimpleGrid columns={[1, 1, 2]} gap={8}>
                <Section>
                    <WorkGridItem id="my website" title="My Website" thumbnail={MyWebDemo}>
                        A sleek personal website, leveraging Chakra UI and Next.js, enhanced with engaging Three.js animations for a unique visual experience.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem
                        id="weenix"
                        title="Weenix"
                        thumbnail={Weenix}
                    >
                        A full operating system kernel, based on Unix, built as a semester-long project in CS 1690 (Operating Systems) at Brown University.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    )
}
export default Projects
