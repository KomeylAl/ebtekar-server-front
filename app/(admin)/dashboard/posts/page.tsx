import React from 'react'
import Header from '../../_components/Header'
import Link from 'next/link'
import PostsList from '../../_components/PostsList'

const Posts = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="مقالات وبلاگ" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-fit flex flex-col p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">آخرین مقالات</h2>
            <div className="px-12 py-2 bg-amber-600 rounded-md text-white text-center cursor-pointer">
              <Link href='/dashboard/posts/add'>
              افزودن مطلب
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <PostsList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts