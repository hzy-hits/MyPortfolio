import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()
  const router = useRouter()

  const colorScheme = useColorModeValue('purple', 'orange')
  const icon = useColorModeValue(<MoonIcon />, <SunIcon />)
  const colorModeKey = useColorModeValue('light', 'dark')

  if (router.pathname === '/') {
    return null
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={colorModeKey}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle theme"
          colorScheme={colorScheme}
          icon={icon}
          onClick={toggleColorMode}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemeToggleButton
