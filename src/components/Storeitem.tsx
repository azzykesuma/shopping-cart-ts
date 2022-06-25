import React from 'react'
import { Card } from 'react-bootstrap';

type StoreItemsProps = {
    id : number,
    name : string,
    price : number,
    imgUrl : string
}

const Storeitem = ({id, name, price , imgUrl} : StoreItemsProps) => {
    console.log(imgUrl);
  return (
    <Card>
        <Card.Img 
        src={imgUrl} 
        variant='top' 
        height='200px'
        style={{ objectFit : 'cover'}} />
    </Card>
  )
}

export default Storeitem