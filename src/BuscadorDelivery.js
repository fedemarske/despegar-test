import React, { useState, useEffect } from 'react'
import { navigate } from "@reach/router";
import { Col, Row, Button } from 'reactstrap';
import DataGrid from './DataGrid/DataGrid'
import { getAllDeliveries } from './utils/delivery'
import columns from './deliveryListColumns'

const BuscadorDelivery = () => {
  const [deliveries, setDeliveries] = useState([])

  useEffect(()=> {
    updateDeliveries()
  }, [])

  const updateDeliveries = () => {
    const deliveries = getAllDeliveries()
    setDeliveries(deliveries)
  }
  
  return(
    <div className="delivey-list-container">
      <Row className="header">
        <Col xs={9}><h4>Listado de deliveries</h4></Col>
        <Col xs={3} className="create-container">
          <Button color="primary" onClick={() => navigate('/delivery')}>Crear nuevo Delivery</Button>
        </Col>
      </Row>
      <Row>
        <DataGrid
            data={deliveries}
            itemsPerPage={5}
            columns={columns}
            customHandlers={{updateDeliveries}}
        />
      </Row>
    </div>
  )
}

export default BuscadorDelivery;