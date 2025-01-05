import React from 'react'
import ProductItem from './ProductItem';
import Link from 'next/link';

interface ShopCompProps {
   data: Array<Object>;
   cats: Array<Object>
 }

const ShopComp = ({ data, cats }: ShopCompProps) => {
  return (
   <div className="py-8">
   <div className="w-full flex flex-col lg:flex-row gap-5">
     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       {data.map((post: any) => (
         <ProductItem key={post.id} data={post} />
       ))}
     </div>
     <div className="w-full lg:w-[30%] h-fit p-4 bg-white bg-opacity-85 rounded-lg">
      <p className="text-lg font-semibold">دسته بندی ها</p>
      <div className="mt-4">
       {cats.map((cat: any) => (
         <Link href='/' key={cat.id}>
           <li className="hover:text-blue-500 transition-all duration-300">
           {cat.title}
           </li>
         </Link>
       ))}
      </div>
     </div>
   </div>
 </div>
  )
}

export default ShopComp