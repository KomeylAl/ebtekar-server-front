import Header from "@/components/Header"
import Image from "next/image"
import notFound from '@/app/images/404.webp'

export default function NotFoundCatchAll() {
  return (
   <div className='p-8 flex flex-col'>
      <Header title='صفحه مورد نظر پیدا نشد!' />
      <div className='p-8 flex items-center justify-center'>
         <Image 
            src={notFound}
            alt='not found'
            width={500}
            height={500}
         />
      </div>
    </div>
  )
}