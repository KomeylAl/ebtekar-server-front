'use client';

import { getProductCategory } from '@/actions/get-category';
import Header from '@/app/(admin)/_components/Header'
import ProductCatItem from '@/app/(admin)/_components/ui/ProductCatItem'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ProductCategories = () => {

   const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const categories = await getProductCategory();
    setCats(categories);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col gap-8">
         <Header pageTitle="دسته بندی های محصولات" />
         <div>در حال دریافت اطلاعات</div>
      </div>
    );
  }

  return (
   <div className="w-full h-full flex flex-col">
   <Header pageTitle="دسته بندی های محصولات" />
   <div className="w-full flex flex-col gap-8 p-8">
     <div className="flex items-center justify-between">
       <h2 className="font-semibold text-xl">دسته بندی ها</h2>
       <div className="px-12 py-2 bg-amber-600 rounded-md text-white text-center cursor-pointer">
         <Link href="/dashboard/products/categories/add">افزودن دسته</Link>
       </div>
     </div>
     <div className="mt-12">
      {cats.map((cat: any) => (
         <ProductCatItem data={cat} key={cat.id} onDelete={fetchData} />
      ))}
     </div>
   </div>
 </div>
  )
}

export default ProductCategories