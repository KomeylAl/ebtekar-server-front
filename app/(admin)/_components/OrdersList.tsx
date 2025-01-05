'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import OrderRow from './OrderRow';

const OrdersList = () => {
   const [orders, setOrders]: any = useState([]);
   const [loading, setLoading]: any = useState(false);
 
   useEffect(() => {
    const fetchProducts = async () => {
       setLoading(true)
       await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}orders`)
          .then(function (response) {
            setOrders(response.data)
          })
          .catch(function (error) {
             console.log(error.data)
             toast.error('خطا در دریافت اطلاعات سفارشات')
          })
          .finally(() => setLoading(false))
    }
 
    fetchProducts()
   }, [])
 
   if (loading) {
    return (
       <div className="flex w-full h-screen items-center justify-center">
          در حال دریافت اطلاعات
       </div>
    )
   }
 
   return (
    <div className="w-full flex flex-col gap-3">
       {orders.map((product: any) => (
          <OrderRow key={product.id} data={product} />
       ))}
    </div>
   );
}

export default OrdersList