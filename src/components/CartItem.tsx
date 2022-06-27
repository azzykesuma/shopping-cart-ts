import React from 'react'
import { useShoppingCart } from '../context/ShoppingContext'
import Storeitems from '../data/items.json'
import { Stack } from 'react-bootstrap'
import CurrencyFormatter from '../utilities/CurrencyFormatter'
import { Button } from 'react-bootstrap'

type CartItemProps = {
    id : number,
    quantity : number
}

const CartItem = ({id,quantity} : CartItemProps) => {
    const { remove } = useShoppingCart();
    const item = Storeitems.find(i => i.id === id)
    if(item == null) return null

  return (
    <Stack direction='horizontal' gap={2}
    className='d-flex align-items-center'>
        <img
        src={item.imgUrl}
        style={{
            width : '125px',
            height : '75px',
            objectFit : 'cover'
        }}
        />
        <div className='me-auto'>
            <div>
                {item?.name} {' '} {quantity > 1 && (<span className='text-muted' style={{ fontSize : '.65rem'}}>x{quantity}</span>)}
            </div>
            <div className='text-muted' style={{ fontSize: '.75rem'}}>{CurrencyFormatter(item.price)}</div>
        </div>
            <div>{CurrencyFormatter(item.price * quantity)}</div>
            <Button variant='outline-danger' size='sm' onClick={() => remove(item.id)}>&times;</Button>
    </Stack>
  )
}

export default CartItem