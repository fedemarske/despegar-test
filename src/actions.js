import React, {useState} from 'react'
import { navigate } from "@reach/router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalCustom from './ModalCustom'
import { removeDelivery } from './utils/delivery'

const Actions = ({rowData, customHandlers}) => {
  const [showModal, setShowModal] = useState(false)
  
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  const deleteRow = () => {
    removeDelivery(rowData.id)
    customHandlers.updateDeliveries()
    toggleModal()
  }
  const editRow = () => {
    navigate(`/delivery/${rowData.id}`)
  }
  return(
    <React.Fragment>
      <Button color="danger" onClick={toggleModal}>Delete</Button>
      <Button color="primary" onClick={editRow}>Edit</Button>
      {showModal ? (
        <ModalCustom>
          <Modal isOpen={showModal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Eliminar</ModalHeader>
            <ModalBody>
              Desea Eliminar el delivery?
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
              <Button color="danger" onClick={deleteRow}>Aceptar</Button>{' '}
            </ModalFooter>
          </Modal>
        </ModalCustom>
      ) : null}
    </React.Fragment>
  )
}

export default Actions;