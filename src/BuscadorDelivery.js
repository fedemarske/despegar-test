import React, { useState, useEffect } from 'react'
import { navigate } from "@reach/router";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DataGrid from './DataGrid/DataGrid'
import { getAllDeliveries } from './utils/delivery'

const getDireccion = (data) => {
  return data.datosAdmn.addrAdm
}

const Actions = (rowData) => {
  const deleteRow = () => {
    console.log(rowData)
    console.log("delete")
  }
  const editRow = () => {
    console.log("edit")
    navigate(`/delivery/${rowData.id}`)
  }
  return(
    <React.Fragment>
      <Button color="danger" onClick={deleteRow}>Delete</Button>
      <Button color="primary" onClick={editRow}>Edit</Button>
    </React.Fragment>
  )
}

const columns = [
  {
    title: 'Nombre',
    content: 'datosAdmn.nameAdm',
    sortable: true,
    filter: true
  },
  {
    title: 'Direccion',
    content: getDireccion,
    sortable: false
  },
  {
    title: 'Telefono',
    content: 'datosAdmn.phoneAdm'
  },
  {
    title: '',
    content: Actions
  },
]

const BuscadorDelivery = () => {
  const [deliveries, setDeliveries] = useState([])

  useEffect(()=> {
    const deliveries = getAllDeliveries()
    setDeliveries(deliveries)
  }, [])
  
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
        />
      </Row>
    </div>
  )
}

export default BuscadorDelivery;