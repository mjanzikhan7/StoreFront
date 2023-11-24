import {
    Badge,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    DrawerCloseButton,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
    Divider,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import CartIcon from '../../assets/images/cart.svg'
import React, { useContext } from 'react'
import { CartContext } from './CartProvider'
import { getProductImage } from '../../Pages/Products/utils'

const Cart = () => {
    const { isOpen, onToggle } = useDisclosure()
    const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
  return (
    <Box>
        <Button
            data-testid='cart-button'
            fontSize={'sm'}
            fontWeight={400}
            backgroundColor={ useColorModeValue('transparent') }
            paddingX={ '20px' }
            onClick={ onToggle }
            minW={ '80px' }
            justifyContent={ 'flex-end' }
            _hover={ {
                backgroundColor: useColorModeValue('transparent'),
            }}
        >
            <Image src={ CartIcon } alt='cart' />
            <Badge
                data-testid='cart-count'
                borderRadius='full' position={ 'absolute' } top={ '-4px' } right={ '0px' } px='2' colorScheme='teal' hidden={ cartItems.length === 0 }>
                { cartItems.length }
            </Badge>
        </Button>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={ onToggle }
            size={'md'}
        >
            <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Stack justifyContent={ 'space-between' } direction={ 'row' }>
                            <DrawerCloseButton />
                            <Text
                                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                                fontFamily={'heading'}
                                color={useColorModeValue('gray.800', 'white')}>
                                Cart
                            </Text>
                        </Stack>
                        <Text
                            textAlign={useBreakpointValue({ base: 'right', md: 'right' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('gray.800', 'white')}
                            onClick={ clearCart }
                            hidden={ cartItems.length === 0 }
                            _hover={{
                                cursor: 'pointer',
                            }}
                        >
                            Clear all
                        </Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack bg={useColorModeValue('white', 'gray.800')} pt={4}>
                            <Text
                                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                                fontFamily={'heading'}
                                color={useColorModeValue('gray.800', 'white')}
                                hidden={ cartItems.length !== 0 }
                            >
                                Your cart is empty.
                            </Text>
                            {cartItems.map((item) => (
                                <Box key={item.id}>
                                    <Stack direction='row' alignItems={ 'center' } justifyContent={'space-between'}>
                                        <Stack direction='row' alignItems={'center'}>
                                            <Image borderRadius='full' boxSize='40px' src={ getProductImage(item.id) } alt={ item.title }/>
                                            <Text>
                                                {item.title}
                                            </Text>
                                            <Text>
                                                {`${item.unit}${item.price}`}
                                            </Text>
                                        </Stack>
                                        <Stack direction='row' alignItems={'center'}>
                                            <Text>
                                                quantity: {item.quantity}
                                            </Text>
                                            <CloseIcon
                                                onClick={() => removeFromCart(item)}
                                                fontSize='10px'
                                                _hover={{
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </Stack>
                                    </Stack>
                                </Box>
                            ))}
                            <Divider />
                            <Text hidden={ cartItems.length === 0 }>
                                Total: { cartItems[0] ? cartItems[0].unit : '' }{ getCartTotal() }
                            </Text>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
        </Drawer>
    </Box>
  )
}

export default Cart
