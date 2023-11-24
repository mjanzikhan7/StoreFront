import React from 'react'
import { Routes as BrowserRoutes, Route } from 'react-router'
import { Layout } from './Layout'
import { ProductList } from '../Pages/Products'
import { HomePage } from '../Pages/Home'

export const Routes = () => {
  return (
    <BrowserRoutes>
        <Route exact path='/' element={ <Layout /> }>
            <Route index Component={ HomePage } />
            <Route path='products' Component={ ProductList } />
        </Route>
    </BrowserRoutes>
  )
}
