import Link from 'next/link'
import React from 'react'

interface CommentRowProps {
   data: any
}

const CommentRow = ({ data }: CommentRowProps) => {
  return (
   <div className="w-full bg-white p-6 rounded-md">
   <div className="flex items-center justify-between">
     <p className="text-blue-500">{data.id}</p>
     <h2 className="">{data.person_name}</h2>
     <p>{data.field}</p>
     <p className='max-w-56 text-justify'>{data.comment}</p>
     <div className="flex items-center gap-2">
       <Link
         href={`/dashboard/posts/edit/${data.slug}`}
         className="bg-blue-500 text-white rounded-md px-6 py-2"
       >
         ویرایش نظر
       </Link>
       <button className="bg-rose-500 text-white rounded-md px-6 py-2">
         حذف نظر
       </button>
     </div>
   </div>
 </div>
  )
}

export default CommentRow