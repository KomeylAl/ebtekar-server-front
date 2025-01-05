import React from 'react'
import Header from '../../_components/Header'
import OrdersList from '../../_components/OrdersList'

const Orders = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="سفارشات" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-fit flex flex-col p-4">
          <div className="">
            <h2 className="font-bold text-xl">آخرین سفارشات</h2>
          </div>
          <div className="mt-12">
            <OrdersList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders