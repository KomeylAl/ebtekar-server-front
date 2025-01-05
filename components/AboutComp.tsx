import Image from 'next/image'
import React from 'react'
import { BiEnvelope, BiMap, BiPhone } from 'react-icons/bi'
import defaultLogo from '@/app/images/logo.png'

interface AboutCompProps {
   name: string,
   description: string,
   phone: string,
   address: string,
   email: string,
   logo: string,
}

const AboutComp = ({ name, description, phone, address, email, logo }: AboutCompProps) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-8 gap-3'>
      <div className='w-64 h-64 bg-black bg-opacity-80 rounded-full flex items-center justify-center'>
         <Image 
            src={logo || defaultLogo}
            alt='لوگو'
            width={100}
            height={100}
            className='object-cover rounded-full'
         />
      </div>
      <div className='w-full flex flex-col md:flex-row justify-between gap-10 mt-4'>
         <div className='w-full md:w-[45%]'>
            <h2 className='text-2xl'>
               {name}
            </h2>
            <p className='mt-4 text-justify'>
               {description}
            </p>
         </div>
         <div className='w-[1px] h-auto hidden md:block bg-gray-400' />
         <div className='w-auto h-[1px] md:hidden bg-gray-400' />
         <div className='w-full md:w-[45%]'>
            <BiMap size={50} />
            <p className='mt-4'>{address}</p>
            <BiPhone size={50} className='mt-8' />
            <p className='mt-4'>{phone}</p>
            <BiEnvelope size={50} className='mt-8' />
            <p className='mt-4'>{email}</p>
         </div>
      </div>
    </div>
  )
}

export default AboutComp