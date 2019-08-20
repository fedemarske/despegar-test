import React, { useState, useEffect } from 'react'
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { handleChange, setValidationOnForm } from './utils/form'
import { defaultValues, FormDatosAdmFields } from './constants'

const FormDatosAdm = ({ setFormData, formData, deliveryData }) => {
  const [nameAdm, setNameAdm] = useState({...defaultValues, ...{ validation: {maxLenght: 50, isRequired: true }}})
  const [phoneAdm, setPhoneAdm] = useState({...defaultValues, ...{ validation: {maxLenght: 50, isRequired: true }}})
  const [descAdm, setDescAdm] = useState({...defaultValues, ...{ validation: {maxLenght: 1000, isRequired: true }}})
  const [especAdm, setEspecAdm] = useState({...defaultValues, ...{ validation: {maxLenght: 500, isRequired: false }}})
  const [addrAdm, setAddrAdm] = useState({...defaultValues, ...{ validation: {maxLenght: 200, isRequired: true }}})
  const [fromAdm, setFromAdm] = useState({...defaultValues, ...{ validation: {isRequired: true }}})
  const [toAdm, setToAdm] = useState({...defaultValues, ...{ validation: {isRequired: true }}})

  useEffect(()=> {
    if(deliveryData){
      setNameAdm({...nameAdm, ...{ value: deliveryData['nameAdm'], isValid: true }})
      setPhoneAdm({...phoneAdm, ...{ value: deliveryData['phoneAdm'], isValid: true }})
      setDescAdm({...descAdm, ...{ value: deliveryData['descAdm'], isValid: true }})
      setEspecAdm({...especAdm, ...{ value: deliveryData['especAdm'], isValid: true }})
      setAddrAdm({...addrAdm, ...{ value: deliveryData['addrAdm'], isValid: true }})
      setFromAdm({...fromAdm, ...{ value: deliveryData['fromAdm'], isValid: true }})
      setToAdm({...toAdm, ...{ value: deliveryData['toAdm'], isValid: true }})
    }
  }, [deliveryData])

  useEffect(()=> {
    const fieldsData = {nameAdm, phoneAdm, descAdm, especAdm, addrAdm, fromAdm, toAdm}
    setValidationOnForm(FormDatosAdmFields, setFormData, formData, fieldsData)
  }, [nameAdm, phoneAdm, descAdm, especAdm, addrAdm, fromAdm, toAdm])

  return(
      <React.Fragment>
        <h4 className="form-title">Datos Administrativos</h4>
        <Row>
          <Col xs="6">
            <Form className="form-body">
              <FormGroup row>
                <Label for="nameAdm" sm={4}>Nombre</Label>
                <Col sm={6}>
                  <Input type="text" 
                    value={nameAdm.value}
                    maxLength={nameAdm.validation.maxLenght}
                    onChange={(e) => handleChange(e, setNameAdm, nameAdm, setFormData, formData)} 
                    name="nameAdm" 
                    id="nameAdm" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="phoneAdm" sm={4}>Telefono</Label>
                <Col sm={6}>
                  <Input type="text" 
                    value={phoneAdm.value}
                    onChange={(e) => handleChange(e, setPhoneAdm, phoneAdm, setFormData, formData)}  
                    name="phoneAdm" 
                    id="phoneAdm" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="descAdm" sm={4}>Descripcion</Label>
                <Col sm={8}>
                  <Input type="textarea" 
                    value={descAdm.value} 
                    onChange={(e) => handleChange(e, setDescAdm, descAdm, setFormData, formData)} 
                    name="descAdm" id="descAdm" />
                  <FormText>Restan {1000 - descAdm.value.length} caracteres.</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="especAdm" xs={4}>Especialidades</Label>
                <Col sm={8}>
                  <Input type="textarea" 
                    value={especAdm.value}
                    onChange={(e) => handleChange(e, setEspecAdm, especAdm, setFormData, formData)}
                    name="especAdm" 
                    id="especAdm" />
                  <FormText>Restan {500 - especAdm.value.length} caracteres.</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="addrAdm" sm={4}>Direccion</Label>
                <Col sm={6}>
                  <Input type="text" 
                    value={addrAdm.value} 
                    onChange={(e) => handleChange(e, setAddrAdm, addrAdm, setFormData, formData)} 
                    name="addrAdm" 
                    id="addrAdm" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="fromAdm" xs={4}>Horario de Atencion</Label>
                <Col sm={3}>
                  <Input
                    type="time"
                    name="fromAdm"
                    id="fromAdm"
                    onChange={(e) => handleChange(e, setFromAdm, fromAdm, setFormData, formData)}
                    value={fromAdm.value}
                    placeholder="time placeholder"
                  />
                </Col>
                <span className="time-divider">a</span>
                <Col sm={3}>
                <Input
                  type="time"
                  name="toAdm"
                  id="toAdm"
                  onChange={(e) => handleChange(e, setToAdm, toAdm, setFormData, formData)}
                  value={toAdm.value}
                  placeholder="time placeholder"
                />
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col xs="6" className="form-body">
            <div className="error-msg text-danger">{nameAdm.errorMsg}</div>
            <div className="error-msg text-danger">{phoneAdm.errorMsg}</div>
            <div className="error-msg textarea text-danger">{descAdm.errorMsg}</div>
            <div className="error-msg textarea text-danger">{especAdm.errorMsg}</div>
            <div className="error-msg text-danger">{addrAdm.errorMsg}</div>
            <div className="error-msg text-danger">{fromAdm.errorMsg}</div>
          </Col>
        </Row>
      </React.Fragment>
  )
}

export default FormDatosAdm;