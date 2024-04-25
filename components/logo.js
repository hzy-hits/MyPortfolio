import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 60px;
  line-height: 40px;
  padding: 10px;

  &:hover img {
    transform: rotate(45deg);
  }
`

const Logo = () => {
  const imageSuffix = useColorModeValue('', '_dark')
  const particleIconSrc = `/images/atom${imageSuffix}.png`

  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <Image src={particleIconSrc} width={50} height={50} alt="logo" />
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontFamily='M PLUS Rounded 1c",sans-serif'
          fontWeight="bold"
          ml={3}
        >
          Zhenyu Huang
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
