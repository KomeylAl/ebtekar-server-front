import Header from '@/components/Header'
import Image from 'next/image'
import React from 'react'
import error from '@/app/images/500.webp'

const EnternalServerError = () => {
  return (
   <div className='p-8 flex flex-col'>
   <Header title='متاسفیم. برای سرور مشکلی پیش آمده!' />
   <div className='p-8 flex items-center justify-center'>
      <Image 
         src={error}
         alt='not found'
         width={500}
         height={500}
      />
   </div>
 </div>
  )
}

export default EnternalServerError