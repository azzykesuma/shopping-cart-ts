import React, { createContext, ReactNode, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart'

interface ShoppingContextProps {
    children : ReactNode
}

type CartItems = {
    id : number,
    quantity : number
}

type ShoppingCartFunctions = {
    openCart : () => void
    closeCart : () => void
    getItemQuantity : (id : number) => number
    increaseQuantity : (id : number) => void
    decreaseQuantity : (id : number) => void
    remove : (number : number) => void
    cartQuantity : number;
    cartItems : CartItems[];
}


const shoppingCartContext = createContext({} as ShoppingCartFunctions)

export function useShoppingCart() {
    return useContext(shoppingCartContext)
}

export function ShoppingCartProvider ({children} : ShoppingContextProps) {
    const [cartItems,setCartItems] = useState<CartItems[]>([])
    const [open, setopen] = useState(false);
    const [close, setclose] = useState(false)


    const openCart = () => setopen(true)
    const closeCart = () => setopen(false)

    function getItemQuantity(id : number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseQuantity(id : number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity : 1}]
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseQuantity(id : number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1 ) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function remove(id : number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    const cartQuantity = cartItems.reduce((quantity,item) => item.quantity + quantity, 0)

    return (
        <shoppingCartContext.Provider value={{getItemQuantity,increaseQuantity,decreaseQuantity,remove,cartItems,cartQuantity,openCart,closeCart}}>
            {children}
            <ShoppingCart open={open}/>
        </shoppingCartContext.Provider>
    )
}