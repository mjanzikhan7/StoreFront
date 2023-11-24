export const getProductImage = (id) => `https://unsplash.it/400/300?image=${id + 10}`

export const formatProduct = (product) => {
    return ({
        id: product.id,
        imageUrl: getProductImage(product.id),
        imageAlt: product.name,
        title: product.name,
        price: product.price,
        unit: '$',
    })
}
