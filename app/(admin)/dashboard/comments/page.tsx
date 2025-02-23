import React from 'react'
import Header from '../../_components/Header'
import Link from 'next/link'
import CommentsList from '../../_components/CommentsList'

const Comments = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="نظرات مشتریان" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-fit flex flex-col p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">آخرین نظرات</h2>
            <div className="px-12 py-2 bg-amber-600 rounded-md text-white text-center cursor-pointer">
              <Link href='/dashboard/products/add'>
              افزودن نظر
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <CommentsList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments