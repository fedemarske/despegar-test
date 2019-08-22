import React, { useState, useEffect } from 'react'
import { Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { handleChange, setValidationOnForm } from './utils/form'
import { defaultValues, FormContactComercialFields } from './constants'

const FormContactComercial = ({ setFormData, formData, deliveryData }) => {
  const [nameContComer, setNameContComer] = useState({...defaultValues, ...{ validation: {maxLenght: 200, isRequired: true }}})
  const [apellContComer, setApellContComer] = useState({...defaultValues, ...{ validation: {maxLenght: 200, isRequired: true }}})
  const [phoneContComer, setPhoneContComer] = useState({...defaultValues, ...{ validation: {maxLenght: 100, isRequired: true }}})
  const [emailContComer, setEmailContComer] = useState({...defaultValues, ...{ validation: {maxLenght: 100, isRequired: false }}})
  const [checkIdem, setCheckIdem] = useState({...defaultValues, ...{ validation: {}, value: false, isValid: true}})

  useEffect(()=> {
    if(deliveryData && !deliveryData.checkIdem){
      setNameContComer({...nameContComer, ...{ value: deliveryData['nameContComer'], isValid: true }})
      setApellContComer({...apellContComer, ...{ value: deliveryData['apellContComer'], isValid: true }})
      setPhoneContComer({...phoneContComer, ...{ value: deliveryData['phoneContComer'], isValid: true }})
      setEmailContComer({...emailContComer, ...{ value: deliveryData['emailContComer'], isValid: true }})
    } else if(deliveryData && deliveryData.checkIdem) {
      setCheckIdem({...checkIdem, ...{ value: deliveryData['checkIdem'], isValid: true }})
    }
  }, [deliveryData])

  useEffect(()=> {
    const fieldsData = {nameContComer, apellContComer, phoneContComer, emailContComer}
    setValidationOnForm(FormContactComercialFields, setFormData, formData, fieldsData, checkIdem.value)
  }, [checkIdem, nameContComer, apellContComer, phoneContComer, emailContComer])

  return(
      <Col xs="6">
      <h4 className="form-title">Contacto Comercial</h4>
      <FormGroup check>
        <Input type="checkbox" name="checkIdem" id="checkIdem" 
          onChange={(e) => handleChange(e, setCheckIdem, checkIdem, setFormData, formData, true)} 
          checked={checkIdem.value} 
          value={checkIdem.value} />
        <Label for="exampleCheck" check>Idem Contacto Administrativo</Label>
      </FormGroup>
      <Form className="form-body checkbox-idem">
        <FormGroup row>
          <Label for="nameContComer" sm={4}>Nombre</Label>
          <Col sm={6}>
              <Input type="text"
                invalid={!nameContComer.isValid}
                value={nameContComer.value}
                disabled={checkIdem.value}
                maxLength={nameContComer.validation.maxLenght}
                onChange={(e) => handleChange(e, setNameContComer, nameContComer, setFormData, formData)} 
                name="nameContComer" id="nameContComer" />
                <FormFeedback>{nameContComer.errorMsg}</FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="apellContComer" sm={4}>Apellido</Label>
          <Col sm={6}>
              <Input type="text"
                invalid={!apellContComer.isValid}
                value={apellContComer.value}
                disabled={checkIdem.value}
                maxLength={apellContComer.validation.maxLenght}
                onChange={(e) => handleChange(e, setApellContComer, apellContComer, setFormData, formData)} 
                name="apellContComer" id="apellContComer" />
                <FormFeedback>{apellContComer.errorMsg}</FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="phoneContComer" sm={4}>Telefono</Label>
          <Col sm={6}>
              <Input type="text"
                invalid={!phoneContComer.isValid}
                value={phoneContComer.value}
                disabled={checkIdem.value}
                maxLength={phoneContComer.validation.maxLenght}
                onChange={(e) => handleChange(e, setPhoneContComer, phoneContComer, setFormData, formData)} 
                name="phoneContComer" id="phoneContComer" />
                <FormFeedback>{phoneContComer.errorMsg}</FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="emailContComer" sm={4}>Email</Label>
          <Col sm={6}>
              <Input type="email"
                invalid={!emailContComer.isValid}
                value={emailContComer.value}
                disabled={checkIdem.value}
                maxLength={emailContComer.validation.maxLenght}
                onChange={(e) => handleChange(e, setEmailContComer, emailContComer, setFormData, formData)} 
                name="emailContComer" id="emailContComer" />
                <FormFeedback>{emailContComer.errorMsg}</FormFeedback>
          </Col>
        </FormGroup>
      </Form>
    </Col>
  )
}

export default FormContactComercial;