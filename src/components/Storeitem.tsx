import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingContext';
import CurrencyFormatter from '../utilities/CurrencyFormatter'

type StoreItemsProps = {
    id : number,
    name : string,
    price : number,
    imgUrl : string
}

const Storeitem = ({id, name, price , imgUrl} : StoreItemsProps) => {
    const { getItemQuantity,increaseQuantity,decreaseQuantity,remove } = 
    useShoppingCart()
    const quantity = getItemQuantity(id);
  return (
    <Card className='h-100'>
        <Card.Img 
        src={imgUrl} 
        variant='top' 
        height='200px'
        style={{ objectFit : 'cover'}} />
        <Card.Body className='d-flex flex-column'>
          <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
            <span className='fs-2'>{name}</span>
            <span className='ms-2 text-muted'>{CurrencyFormatter(price)}</span>
          </Card.Title>
          <div className='mt-auto'>
            { quantity === 0 ? (
              <Button className='w-100' onClick={() => increaseQuantity(id)}>+ Add to cart</Button>
            ) : (
              <div className='d-flex flex-column align-items-center' style={{gap : '.5rem'}}>
                <div className='d-flex align-items-center justify-content-center'
                style={{gap : '.5rem'}}
                >
                  <Button onClick={() => increaseQuantity(id)}>+</Button>
                  <div>
                    <span className='fs-3'>{quantity} in cart</span>
                  </div>
                  <Button onClick={() => decreaseQuantity(id)}>-</Button>
                </div>
                <Button variant='danger' size='sm' onClick={() => remove(id)}>Remove</Button>
              </div>
            )}
          </div>
        </Card.Body> 
    </Card>
  )
}

export default Storeitem