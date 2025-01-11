'use client'

import Image from 'next/image'
import hero from '@/app/images/hero.jpg'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

interface ProductGalleryProps {
   images: any
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  return (
   <div className='h-[200px] md:h-[550px]'>
      {!images ? <Image 
                     src={hero}
                     alt=''
                     width={800}
                     height={200}
                     className='w-full h-[200px] md:h-[550px] object-cover rounded-md'
                  /> : <Carousel>
         <CarouselContent>
            {images.map((image: any) => (
               <CarouselItem key={image.id}>
                  <Image 
                     src={image.img_path || hero}
                     alt=''
                     width={800}
                     height={200}
                     className='w-full h-[200px] md:h-[550px] object-cover rounded-md'
                  />
               </CarouselItem>
            ))}
         </CarouselContent>
         <div className='md:block'>
         <CarouselNext className='right-6' />
         <CarouselPrevious className='left-6' />
         </div>
      </Carousel>}
      
   </div>
  )
}

export default ProductGallery