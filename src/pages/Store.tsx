import React from 'react'
import { Row,Col } from 'react-bootstrap'
import StoreItems from '../data/items.json'
import Storeitem from '../components/Storeitem'
const Store = () => {
  return (
    <>
      <Row xs={1} md={2} lg={3} className='g-3'>
        {StoreItems.map(item => (
          <Col key={item.id}><Storeitem {...item} /></Col>
        ))}
      </Row>
    </>
  )
}

export default Store