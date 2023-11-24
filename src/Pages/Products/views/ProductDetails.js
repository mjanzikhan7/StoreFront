import { Box, SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import { ProductCard } from '../components/ProductCard'
import { useQuery } from 'react-query'
import { formatProduct } from '../utils'
import { getProductsApi } from '../endpoints'
import React, { useContext } from 'react'
import { CartContext } from '../../../Components/Cart/CartProvider'

export const ProductList = () => {
    const { addToCart, getCartItem, removeFromCart } = useContext(CartContext)
    const { data = [], isLoading, error } = useQuery('products', getProductsApi)
    const products = data.data
    const arr = new Array(5).fill(0)

    if (error) {
        return (
            <Text color={ 'red' } >Something went wrong</Text>
        )
    }
  return (
    <Box>
        {
            isLoading ? (
                <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={ '10px' } >
                    { arr.map((_, index) => (
                        <Box key={ index }>
                            <Skeleton height='300px'/>
                        </Box>
                    )) }
                </SimpleGrid>
            ) : (
                <SimpleGrid columns={{ sm: 2, md: 3, lg: 5 }} spacing={ '10px' } >
                    { products.map(product => (
                        <Box
                            key={ product.id }
                        >
                            <ProductCard
                                addToCart={addToCart}
                                removeFromCart={ removeFromCart }
                                inCart={ getCartItem(product.id) }
                                product={formatProduct(product)}
                                quantity={ getCartItem(product.id)?.quantity || 0 }
                            />
                        </Box>
                    )) }
                </SimpleGrid>
            )
        }
    </Box>
  )
}
