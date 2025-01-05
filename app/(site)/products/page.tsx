import Header from '@/components/Header'
import ShopComp from '@/components/ShopComp'
import axios from 'axios'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Products() {

  let products: any
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products`)
      .catch(function (error) {
        console.log(error)
        return redirect('/server-error')
      })
      .then(function (response) {
        products = response.data
      })

  let cats: any    
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}product/categories`)
      .then(function (response) {
        cats = response.data
      })
      .catch(function (error) {
        console.log(error)
        return redirect('/server-error')
      })

  if (products.length === 0) {
    return (
      <div className='p-8'>
        <Header title='محصولات' />
        <p className='text-center p-10'>هنوز محصولی موجود نیست</p>
      </div>
    )
  }

  return (
    <div className='py-8'>
      <Header title='محصولات' />
      <ShopComp data={products} cats={cats} />
    </div>
  )
}
