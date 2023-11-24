import { apiclient } from '../../Utils/utils'

const GET_PRODUCTS_ENDPOINT = 'products.json'

export const getProductsApi = () => {
    return apiclient.get(GET_PRODUCTS_ENDPOINT)
}
