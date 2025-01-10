'use client'

import Image from 'next/image'
import hero from '@/app/images/hero.jpg'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

interface ProductGalleryProps {
   images: any
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  return (
   <div className='md:px-8 h-[200px] md:h-[550px]'>
      {images.lenght == 0 ? <div></div> : <Carousel>
         <CarouselContent>
            {images.map((image: any) => (
               <CarouselItem key={image.id}>
                  <Image 
                     src={image.img_path ?? hero}
                     alt=''
                     width={800}
                     height={200}
                     className='w-full h-[200px] md:h-[550px] object-cover rounded-md'
                  />
               </CarouselItem>
            ))}
         </CarouselContent>
         <div className='hidden md:block'>
         <CarouselNext />
         <CarouselPrevious />
         </div>
      </Carousel>}
      
   </div>
  )
}

export default ProductGallery