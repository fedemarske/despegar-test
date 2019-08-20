const validation = (validation, value) => {
  let isValid = true
  let errorMsg = ''
  const { maxLenght, isRequired } = validation
  if(maxLenght && value > maxLenght) {
    isValid = false
  }
  if(isRequired && !value) {
    isValid = false
    errorMsg = 'Este campo es requerido'
  }
  return { isValid, errorMsg };
}

export const handleChange = (e, setData, data, setFormData, formData, isCheckbox) => {
  let newData = {}
  const rawValue = e.currentTarget ? e.currentTarget.value : e
  const value = isCheckbox ? e.currentTarget.checked : rawValue
  const { isValid, errorMsg } = validation(data.validation, e.currentTarget.value)
  newData.value = value
  newData.touched = true
  newData.isValid = isValid
  newData.errorMsg = errorMsg
  const newFieldsData = {
    ...formData.fields,
    ...{[e.currentTarget.name]: value}
  }
  setFormData({...formData, fields: newFieldsData})
  setData({...data, ...newData})
}

export const setValidationOnForm = (formFields, setFormData, formData, fieldsData, isCheckIdem) => {
  if(isCheckIdem) {
    setFormData({...formData, ...{ isValid: true}})
  } else {
    const fieldsInvalid = formFields.filter(field => {
      return !fieldsData[field].isValid
    })
    if(fieldsInvalid.length === 0 ) {
      setFormData({...formData, ...{ isValid: true}})
    } else {
      setFormData({...formData, ...{ isValid: false}})
    }
  }
}