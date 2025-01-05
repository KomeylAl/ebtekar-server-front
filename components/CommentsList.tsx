import React from 'react'
import CommentsItem from './CommentsItem'

interface CommentsListProps {
  data: any
}

const CommentsList = ({ data }: CommentsListProps) => {
  return (
    <div className='mt-32'>
      <h2 className='text-2xl'>نظرات مشتریان ابتکار صنعت اسپادانا</h2>
      <div className='mt-9 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
         {!data ? 'هنوز نظری موجود نیست.' : data.map((comment: any) => (
          <CommentsItem data={comment} key={comment.id} />
         ))}
      </div>
    </div>
  )
}

export default CommentsList