import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingContext'
import CartItem from './CartItem'

type ShoppingCartProps = {
    open : boolean
}

const ShoppingCart = ({ open } : ShoppingCartProps) => {
    const { closeCart, cartItems } = useShoppingCart();
  return (
   <Offcanvas show={open} onHide={closeCart} placement='end'>
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <Stack gap={3}>
            {cartItems.map(item => (
                <CartItem key ={item.id} {...item}/>
            ))}
        </Stack>
    </Offcanvas.Body>
   </Offcanvas>
  )
}

export default ShoppingCart