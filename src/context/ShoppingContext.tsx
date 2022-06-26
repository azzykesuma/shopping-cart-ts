import React, { createContext, ReactNode, useContext, useState } from 'react'

interface ShoppingContextProps {
    children : ReactNode
}

type ShoppingCartFunctions = {
    getItemQuantity : (id : number) => number
    increaseQuantity : (id : number) => void
    decreaseQuantity : (id : number) => void
    remove : (number : number) => void
}

type CartItems = {
    id : number,
    quantity : number
}


const shoppingCartContext = createContext({} as ShoppingCartFunctions)

export function useShoppingCart() {
    return useContext(shoppingCartContext)
}

export function ShoppingCartProvider ({children} : ShoppingContextProps) {
    const [cartItems,setCartItems] = useState<CartItems[]>([])

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

    return (
        <shoppingCartContext.Provider value={{getItemQuantity,increaseQuantity,decreaseQuantity,remove}}>
            {children}
        </shoppingCartContext.Provider>
    )
}