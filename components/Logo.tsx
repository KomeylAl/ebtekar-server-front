import Image from 'next/image'
import React from 'react'
import logo from '@/app/images/logo.png'

interface LogoProps {
  image: string
}

const Logo = ({ image }: LogoProps) => {
  return (
    <div className=''>
      <Image 
        src={image || logo}
        alt=''
        width={64}
        height={64}
      />
    </div>
  )
}

export default Logo