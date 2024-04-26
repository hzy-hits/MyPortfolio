import { forwardRef } from 'react'
import Logo from './logo.js'
import NextLink from 'next/link'

import {
    Container,
    Box,
    Link,
    Stack,
    Heading,
    Flex,
    Menu,
    MenuItem,
    MenuButton,
    MenuList,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import { IoLogoGithub } from 'react-icons/io5'
const LinkItem = ({ href, path, target, children, ...props }) => {
    const active = path === href
    const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
    return (
        <Link
            as={NextLink}
            href={href}
            scroll={false}
            p={2}
            bg={active ? 'grassTeal' : undefined}
            color={active ? '#202023' : inactiveColor}
            target={target}
            {...props}
        >
            {children}
        </Link>
    )
}
const MenuLink = forwardRef(({ href, ...props }, ref) => (
    <NextLink href={href} passHref>
        <Link ref={ref} {...props} />
    </NextLink>
))
MenuLink.displayName = 'MenuLink'
const NavBar = props => {
    const { path } = props
    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={useColorModeValue('#ffffff40', '#20202380')}
            css={{ backdropFilter: 'blur(10px)' }}
            zIndex={2}
            {...props}
        >
            <Container
                as={Flex}
                maxW="container.md"
                p={2}
                align="center"
                wrap="wrap"
                justify="space-between"
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        <Logo />
                    </Heading>
                </Flex>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    display={{ base: 'none', md: 'flex' }}
                    width={{ base: 'full', md: 'auto' }}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0 }}
                >
                    <LinkItem href="/about_me" path={path}>
                        About Me
                    </LinkItem>
                    <LinkItem href="/projects" path={path}>
                        Projects
                    </LinkItem>
                    <LinkItem href="/posts" path={path}>
                        Posts
                    </LinkItem>
                    <LinkItem
                        href="https://github.com/hzy-hits"
                        display="inline-flex"
                        alignItems="center"
                        path={path}
                        pl={2}
                        style={{ gap: 4 }}
                    >
                        <IoLogoGithub />
                        GitHub
                    </LinkItem>
                </Stack>

                <Box flex={1} align="right">
                    <ThemeToggleButton />

                    <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
                        <Menu isLazy id="navbar-menu">
                            <MenuButton
                                as={IconButton}
                                icon={<HamburgerIcon />}
                                variant="outline"
                                aria-label="Options"
                            />
                            <MenuList>
                                <MenuItem as={MenuLink} href="/about_me">
                                    About
                                </MenuItem>
                                <MenuItem as={MenuLink} href="/projects">
                                    Projects
                                </MenuItem>
                                <MenuItem as={MenuLink} href="/posts">
                                    Posts
                                </MenuItem>
                                <MenuItem as={Link} href="https://github.com/hzy-hits">
                                    View My GitHub
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
export default NavBar
