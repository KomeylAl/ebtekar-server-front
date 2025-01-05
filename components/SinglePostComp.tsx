import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFolder } from 'react-icons/fa'
import { MdWatchLater } from 'react-icons/md'
import ProductItem from './ProductItem'

interface SinglePostCompProps {
   data: any;
   products: any
}

const SinglePostComp = ({ data, products }: SinglePostCompProps) => {

   const date = new Date(data.created_at)
   const jalali_date = date.toLocaleDateString('fa-IR')

  return (
    <div className='w-full py-8 px-4 lg:px-32'>
      <div className='w-full h-[400px] rounded-xl'>
         <Image 
            alt={data.title}
            src={data.img_path}
            width={1200}
            height={400}
            className='w-full h-[400px] object-cover rounded-xl'
         />
      </div>
      <div className='mt-5 bg-white bg-opacity-80 w-full p-6 rounded-xl'> 
         <div className='flex gap-6 items-center'>
            <p className='text-gray-400 flex gap-3 items-center'>
               <MdWatchLater size={20} /> {jalali_date}
            </p>
            <Link href='/' className='text-gray-400 flex gap-3 items-center'>
               <FaFolder size={20} /> {data.category}
            </Link>
         </div>
         <p className='text-justify mt-4'>
            {data.body}
         </p>
      </div>
      <div className='mt-20 w-full'>
         <p className='text-xl'>محصولات مرتبط</p>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10'>
            {products.map((product: any) => (
               <ProductItem key={product.id} data={product} />
            ))}
         </div>
      </div>
    </div>
  )
}

export default SinglePostComp