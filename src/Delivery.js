import React, { useState, useEffect } from 'react'
import { navigate } from "@reach/router";
import { Col, Row, Button } from 'reactstrap';
import FormDatosAdm from './FormDatosAdm'
import FormContactAdm from './FormContactAdm'
import FormContactComercial from './FormContactComercial'
import { defaultFormDatosAdm, defaultFormContactAdm, defaultFormContactComercial } from './constants'
import { getDeliveryData, saveDeliveryData } from './utils/delivery'

const Delivery = ({ deliveryId }) => {
  const [formDatosAdm, setFormDatosAdm] = useState(defaultFormDatosAdm)
  const [formContactAdm, setFormContactAdm] = useState(defaultFormContactAdm)
  const [formContactComercial, setFormContactComercial] = useState(defaultFormContactComercial)
  const [areFormsValid, setAreFormsValid] = useState(false)
  const [deliveryData, setDeliveryData] = useState({})

  const submitForm = () => {
    let contactComercial = formContactComercial.fields
    if(formContactComercial.fields.checkIdem) {
      contactComercial = { 
        checkIdem: true,
        nameContComer: formContactAdm.fields.nameContAdm,
        apellContComer: formContactAdm.fields.apellContAdm,
        phoneContComer: formContactAdm.fields.phoneContAdm,
        emailContComer: formContactAdm.fields.emailContAdm,
      }
    }
    const payload = {
      id: deliveryData && deliveryData.id ? deliveryData.id : '_' + Math.random().toString(36).substr(2, 9),
      datosAdmn: formDatosAdm.fields,
      contactAdm: formContactAdm.fields,
      contactComercial: contactComercial
    }
    saveDeliveryData(payload, !!deliveryData)
    navigate('/')
  }

  useEffect(()=> {
    setAreFormsValid(formDatosAdm.isValid && formContactAdm.isValid && formContactComercial.isValid)
  }, [formDatosAdm, formContactAdm, formContactComercial])

  useEffect(() => {
    if(deliveryId) {
      const deliveryData = getDeliveryData(deliveryId)
      if(deliveryData) {
        setDeliveryData(deliveryData)
        setFormDatosAdm({isValid: true, fields: deliveryData.datosAdmn})
        setFormContactAdm({isValid: true, fields: deliveryData.contactAdm})
        setFormContactComercial({isValid: true, fields: deliveryData.contactComercial})
        setAreFormsValid(true)
      }
    }
  },[deliveryId])

  return(
    <div className="delivey-form-container">
      <FormDatosAdm 
        setFormData={setFormDatosAdm} 
        formData={formDatosAdm} 
        deliveryData={deliveryData.datosAdmn} />
      <Row>
        <FormContactAdm 
          setFormData={setFormContactAdm} 
          formData={formContactAdm} 
          deliveryData={deliveryData.contactAdm} />
        <FormContactComercial 
          setFormData={setFormContactComercial} 
          formData={formContactComercial} 
          deliveryData={deliveryData.contactComercial}/>
      </Row>
      <Row>
        <Col sm={{ size: 3, offset: 10 }}>
          <Button color="primary" onClick={() => navigate('/')} className="cancel-btn">Cancelar</Button>
          <Button color="primary" disabled={!areFormsValid} onClick={submitForm}>Guardar</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Delivery;