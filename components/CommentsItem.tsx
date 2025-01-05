import React from 'react'
import { BsPerson } from 'react-icons/bs'

interface CommentsItemProps {
  data: any
}

const CommentsItem = ({ data }: CommentsItemProps) => {
  return (
    <div className='bg-white rounded-xl flex items-start p-4 gap-2'>
      <BsPerson className='text-amber-500 w-52' size={50}/>
      <div className='flex flex-col'>
         <p className='text-xl font-bold'>{data.person_name}</p>
         <p className='text-sm text-gray-600'>{data.field}</p>
         <p className='text-[12px] text-justify mt-6'>
          {data.comment}
         </p>
      </div>
    </div>
  )
}

export default CommentsItem