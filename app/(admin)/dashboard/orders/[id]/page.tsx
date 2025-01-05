import React from 'react'

interface OrderDetailsProps {
   params: {
      id: string
   }
}

const OrderDetails = ({ params }: OrderDetailsProps) => {
  return (
    <div>OrderDetails {params.id}</div>
  )
}

export default OrderDetails