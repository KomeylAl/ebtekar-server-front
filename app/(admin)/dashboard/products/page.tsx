import React from 'react'
import Header from '../../_components/Header'
import ProductsList from '../../_components/ProductsList'
import Link from 'next/link'

const Products = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="محصولات" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-fit flex flex-col p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">محصولات</h2>
            <div className="px-12 py-2 bg-amber-600 rounded-md text-white text-center cursor-pointer">
              <Link href='/dashboard/products/add'>
              افزودن محصول
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <ProductsList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products