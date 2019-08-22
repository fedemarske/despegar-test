import Actions from './actions'

const getDireccion = (rowData) => {
  return rowData.datosAdmn.addrAdm
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
    content: 'datosAdmn.phoneAdm',
    filter: true
  },
  {
    title: '',
    content: {template: Actions}
  },
]

export default columns;