import React from 'react'
import { Outlet } from 'react-router'
import { NavBar } from './Navbar'
import { Box } from '@chakra-ui/react'

export const Layout = () => {
  return (
    <div>
        <NavBar/>
        <Box  padding={ '20px' }>
            <Outlet/>
        </Box>
    </div>
  )
}
