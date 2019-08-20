export const defaultValues = {
  value: '',
  isValid: false,
  touched: false,
  errorMsg: ''
}

export const FormDatosAdmFields = [
  'nameAdm', 
  'phoneAdm',
  'descAdm',
  'especAdm',
  'addrAdm',
  'fromAdm',
  'toAdm'
]

export const FormContactAdmFields = [
  'nameContAdm', 
  'apellContAdm',
  'phoneContAdm',
  'emailContAdm',
]

export const FormContactComercialFields = [
  'nameContComer',
  'apellContComer',
  'phoneContComer',
  'emailContComer',
]

export const defaultFormDatosAdm = {
  fields: {
    nameAdm: '',
    phoneAdm: '',
    descAdm: '',
    especAdm: '',
    addrAdm: '',
    fromAdm: '',
    toAdm: ''
  },
  isValid: false
}

export const defaultFormContactAdm = {
  fields: {
    nameContAdm: '',
    apellContAdm: '',
    phoneContAdm: '',
    emailContAdm: '',
  },
  isValid: false
}

export const defaultFormContactComercial = {
  fields: {
    checkIdem: false,
    nameContComer: '',
    apellContComer: '',
    phoneContComer: '',
    emailContComer: '',
  },
  isValid: false
}