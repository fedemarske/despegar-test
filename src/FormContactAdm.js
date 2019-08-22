import React, { useState, useEffect } from 'react'
import { Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { handleChange, setValidationOnForm } from './utils/form'
import { defaultValues, FormContactAdmFields } from './constants'

const FormContactAdm = ({ setFormData, formData, deliveryData }) => {
  const [nameContAdm, setNameContAdm] = useState({...defaultValues, ...{ validation: {maxLenght: 200, isRequired: true }}})
  const [apellContAdm, setApellContAdm] = useState({...defaultValues, ...{ validation: {maxLenght: 200, isRequired: true }}})
  const [phoneContAdm, setPhoneContAdm] = useState({...defaultValues, ...{ validation: {maxLenght: 100, isRequired: true }}})
  const [emailContAdm, setEmailContAdm] = useState({...defaultValues, ...{ validation: {maxLenght: 100, isRequired: false }}})
  
  useEffect(()=> {
    if(deliveryData){
      setNameContAdm({...nameContAdm, ...{ value: deliveryData['nameContAdm'], isValid: true }})
      setApellContAdm({...apellContAdm, ...{ value: deliveryData['apellContAdm'], isValid: true }})
      setPhoneContAdm({...phoneContAdm, ...{ value: deliveryData['phoneContAdm'], isValid: true }})
      setEmailContAdm({...emailContAdm, ...{ value: deliveryData['emailContAdm'], isValid: true }})
    }
  }, [deliveryData])

  useEffect(()=> {
    const fieldsData = {nameContAdm, apellContAdm, phoneContAdm, emailContAdm}
    setValidationOnForm(FormContactAdmFields, setFormData, formData, fieldsData)
  }, [nameContAdm, apellContAdm, phoneContAdm, emailContAdm])
  
  return(
      <Col xs="6">
      <h4 className="form-title">Contacto Administrativo</h4>
      <Form className="form-body">
        <FormGroup row>
          <Label for="nameContAdm" sm={4}>Nombre</Label>
          <Col sm={6}>
              <Input type="text"
                value={nameContAdm.value}
                maxLength={nameContAdm.validation.maxLenght}
                invalid={!nameContAdm.isValid}
                onChange={(e) => handleChange(e, setNameContAdm, nameContAdm, setFormData, formData)} 
                name="nameContAdm" id="nameContAdm" />
                <FormFeedback>{nameContAdm.errorMsg}</FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="apellContAdm" sm={4}>Apellido</Label>
          <Col sm={6}>
              <Input type="text"
                value={apellContAdm.value}
                invalid={!apellContAdm.isValid}
                maxLength={apellContAdm.validation.maxLenght}
                onChange={(e) => handleChange(e, setApellContAdm, apellContAdm, setFormData, formData)} 
                name="apellContAdm" id="apellContAdm" />
                <FormFeedback>{apellContAdm.errorMsg}</FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="phoneContAdm" sm={4}>Telefono</Label>
          <Col sm={6}>
              <Input type="text"
                value={phoneContAdm.value}
                invalid={!phoneContAdm.isValid}
                maxLength={phoneContAdm.validation.maxLenght}
                onChange={(e) => handleChange(e, setPhoneContAdm, phoneContAdm, setFormData, formData)}
                name="phoneContAdm" id="phoneContAdm" />
                <FormFeedback>{phoneContAdm.errorMsg}</FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="emailContAdm" sm={4}>Email</Label>
          <Col sm={6}>
              <Input type="email"
                value={emailContAdm.value}
                invalid={!emailContAdm.isValid}
                maxLength={emailContAdm.validation.maxLenght}
                onChange={(e) => handleChange(e, setEmailContAdm, emailContAdm, setFormData, formData)}
                name="emailContAdm" id="emailContAdm" />
                <FormFeedback>{emailContAdm.errorMsg}</FormFeedback>
          </Col>
        </FormGroup>
      </Form>
    </Col>
  )
}

export default FormContactAdm;