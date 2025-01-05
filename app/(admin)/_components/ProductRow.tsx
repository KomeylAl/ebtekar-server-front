import Link from 'next/link'
import React from 'react'

interface ProductRowProps {
   data: any
}

const ProductRow = ({ data }: ProductRowProps) => {
  return (
    <div className='w-full bg-white p-6 rounded-md'>
      <div className='flex items-center justify-between'>
         <p className='text-blue-500'>{data.id}</p>
         <h2 className=''>{data.title}</h2>
         <p>{data.price}</p>
         <p>{data.category}</p>
         <div className='flex items-center gap-2'>
         <Link href={`/dashboard/products/edit/${data.slug}`} className='bg-blue-500 text-white rounded-md px-6 py-2'>ویرایش محصول</Link>
         <button className='bg-rose-500 text-white rounded-md px-6 py-2'>حذف محصول</button>
         </div>
      </div>
    </div>
  )
}

export default ProductRow