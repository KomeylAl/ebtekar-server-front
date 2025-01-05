import React from 'react'
import ProductItem from './ProductItem'

interface ProductListProps {
  data: any
}

const ProductList = ({ data }: ProductListProps) => {
  return (
    <div className='mt-32'>
      <h2 className='text-2xl'>آخرین محصولات</h2>
      <div className='mt-9 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10'>
        {!data ? 'خطا در دریافت محصولات' : data.map((product: any) => (
          <ProductItem key={product.id} data={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList