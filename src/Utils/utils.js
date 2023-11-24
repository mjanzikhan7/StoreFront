import { QueryClient } from 'react-query'
import axios from 'axios'

export const apiclient = axios.create({
    baseURL: 'https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/'
})


export const queryClient = new QueryClient()
