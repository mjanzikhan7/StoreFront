import React, { useEffect } from 'react'

export const CartContext = React.createContext()


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = React.useState([])

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setCartItems(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    const getCartItem = (id) => {
        return cartItems.find((i) => i.id === id)
    }

    const addToCart = (item, quantity) => {
        let newCart = [...cartItems]
        const parsed = Number(quantity);
        if (getCartItem(item.id)) {
            newCart = newCart.map(c => {
                if (item.id === c.id) {
                    return {
                        ...c,
                        quantity: c.quantity ? parsed + c.quantity : c.quantity,
                    }
                }
                return c
            })
        } else {
            newCart.push({
                ...item,
                quantity: parsed,
            })
        }
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCartItems(newCart)
    }

    const removeFromCart = (item, quantity) => {
        let newCart = [ ...cartItems ]
        const currentItem = getCartItem(item.id)
        if (currentItem && quantity && currentItem.quantity > 1) {
            newCart = cartItems.map(c => {
                if (item.id === c.id) {
                    c.quantity -= 1
                }
                return c
            })
        } else {
            newCart = cartItems.filter((i) => i.id !== item.id)
        }
        setCartItems(newCart)
    }

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartItem, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    )
}
