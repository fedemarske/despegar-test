export const getDeliveryData = (id) => {
  const deliveries = JSON.parse(sessionStorage.getItem('deliveries')) || []
  return deliveries.filter( delivery => delivery.id === id)[0];
}

export const getAllDeliveries = () => {
  const deliveries = JSON.parse(sessionStorage.getItem('deliveries')) || []
  return deliveries;
}

export const saveDeliveryData = (payload, isEdit) => {
  const deliveries = JSON.parse(sessionStorage.getItem('deliveries'))
  if(deliveries && isEdit) {
    const deliveriesWithoutCurrent = deliveries.filter( delivery => delivery.id !== payload.id)
    deliveriesWithoutCurrent.push(payload)
    sessionStorage.setItem('deliveries', JSON.stringify(deliveriesWithoutCurrent))
  } else if(deliveries && !isEdit) {
    deliveries.push(payload)
    sessionStorage.setItem('deliveries', JSON.stringify(deliveries))
  } else {
    sessionStorage.setItem('deliveries', JSON.stringify([payload]))
  }
}

export const removeDelivery = (id) => {
  const deliveries = JSON.parse(sessionStorage.getItem('deliveries')) || []
  const deliveriesWithoutCurrent = deliveries.filter( delivery => delivery.id !== id);
  sessionStorage.setItem('deliveries', JSON.stringify(deliveriesWithoutCurrent))
}