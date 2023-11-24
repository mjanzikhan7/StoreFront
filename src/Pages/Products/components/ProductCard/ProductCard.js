import { Box, Button, HStack, Image, Input, useBreakpointValue, useNumberInput } from '@chakra-ui/react'
import React from 'react'

export const ProductCard = ({
    product,
    addToCart,
    quantity = 0,
}) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
    })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' shadow={ 'md' }>
            <Image src={product.imageUrl} alt={product.imageAlt} loading='lazy' />
    
        <Box p='6'>
            <Box display='flex' alignItems='baseline'>
            </Box>
    
            <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
            >
                {product.title}
            </Box>
    
            <Box>
                {`${product.unit} ${product.price}`}
            </Box>
            <HStack width={ useBreakpointValue({ base: '100%', md: '220px' })}>
                <Button {...dec}>-</Button>
                <Input {...input} />
                <Button {...inc}>+</Button>
            </HStack>
            <Box mt={ '20px' }>
                <Button data-testid='add-to-cart' colorScheme='teal' variant='outline' onClick={() => addToCart(product, input.value)}>Add to Cart</Button>
            </Box>
        </Box>
        </Box>
    )
}

