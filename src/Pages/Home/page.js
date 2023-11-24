import React from 'react'
import BannerImage from '../../assets/images/banner.jpg'
import { Box } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import { Button } from '@chakra-ui/button'
import { NavLink } from 'react-router-dom'
import { useBreakpointValue } from '@chakra-ui/media-query'

export const Page = () => {
    const height = useBreakpointValue({ base: '300px', md: '600px' })
  return (
    <Box>
        <Box>
            <Image w={ '100%' } height={ height } src={ BannerImage } objectFit={ 'fill' } alt="Banner" />
        </Box>
        <Box textAlign={ 'center' } p={ '20px' }>
            <Button as={ NavLink } to={ '/products' } > Explore Products </Button>
        </Box>
    </Box>
  )
}
