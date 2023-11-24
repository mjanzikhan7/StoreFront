import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Drawer,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons'
import { Cart } from '../Cart'
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';


export default function Subnavigation() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        shadow={ 'md' }
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems={'center'}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Logo
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
            <Cart />
        </Stack>
      </Flex>

      <MobileNav isOpen={ isOpen } onToggle={ onToggle } />
    </Box>
  )
}

const TopNavLink = ({
  navItem
}) => {
  let resolved = useResolvedPath(navItem.href)
  let match = useMatch({ path: resolved.pathname, end: true });
  const linkColor = useColorModeValue(match ? 'teal' : 'gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('teal', 'white')
  return (
    <Box key={navItem.label}>
      <Popover trigger={'hover'} placement={'bottom-start'}>
        <PopoverTrigger>
          <NavLink to={navItem.href}>
            <Box
              p={2}
              href={navItem.href ?? '#'}
              fontSize={'sm'}
              fontWeight={500}
              color={linkColor}
              borderBottom={match ? '2px' : '0px'}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}>
              {navItem.label}
              </Box>
            </NavLink>
        </PopoverTrigger>
      </Popover>
    </Box>
  )
}

const DesktopNav = () => {

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => {
        return (
          <TopNavLink
            key={ navItem.label }
            navItem={ navItem }
          />
        )})}
    </Stack>
  )
}

const MobileNav = ({
  isOpen,
  onToggle,
}) => {
  return (
    <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={ onToggle }
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              Logo
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
              {NAV_ITEMS.map((navItem) => (
                <MobileNavItem
                  key={navItem.label}
                  onItemClick={ onToggle }
                  {...navItem}
                />
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  )
}

const MobileNavItem = ({ label, href, onItemClick }) => {
  let resolved = useResolvedPath(href)
  let match = useMatch({ path: resolved.pathname, end: true });
  const linkColor = useColorModeValue(match ? 'teal' : 'gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('teal', 'white')
  return (
    <Stack spacing={4} onClick={onItemClick}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        color={linkColor}
        borderBottom={match ? '2px' : '0px'}
        _hover={{
          textDecoration: 'none',
          color: linkHoverColor,
        }}>
        <Text fontWeight={600}>
          {label}
        </Text>
      </Box>
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Products',
    href: '/products',
  },
]
