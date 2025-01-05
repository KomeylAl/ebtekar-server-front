'use client'

import Image from 'next/image'
import SingleProductImage from './SingleProductImage'
import hero from '@/app/images/hero.jpg'

interface ProductGalleryProps {
   images: any
}

const ProductGallery = ({ images }: ProductGalleryProps) => {

   const mainImage = images[0] ? images[0].img_path : hero;

  return (
    <div className='w-full xl:h-[600px] flex flex-col-reverse xl:flex-row gap-3'>
      <div className='xl:h-full flex flex-row xl:flex-col items-center justify-between'>
         {images.map((image: any) => (
            <Image 
               src={image.img_path ?? hero}
               alt=''
               width={200}
               height={50}
               className='xl:h-1/5 w-1/5 xl:w-full rounded-lg object-cover'
            />
         ))}
      </div>
      <SingleProductImage image={mainImage}/>
    </div>
  )
}

export default ProductGallery