import React from 'react'
import PostItem from './PostItem'

interface PostsListProps {
  data: any
}

const PostsList = ({ data }: PostsListProps) => {
  return (
    <div className='my-32'>
      <h2 className='text-2xl'>مقالات وبلاگ</h2>
      <div className='mt-9 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10'>
         {!data ? 'خطا در دریافت پست های وبلاگ' : data.map((post: any) => (
          <PostItem key={post.id} data={post} />
         ))}
      </div>
    </div>
  )
}

export default PostsList