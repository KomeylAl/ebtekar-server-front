'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import PostRow from './PostRow';

const PostsList = () => {
   const [posts, setPosts]: any = useState([]);
   const [loading, setLoading]: any = useState(false);
 
   const fetchPosts = async () => {
      setLoading(true)
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}posts`)
         .then(function (response) {
           setPosts(response.data)
         })
         .catch(function (error) {
            console.log(error.data)
            toast.error('خطا در دریافت اطلاعات مطالب')
         })
         .finally(() => setLoading(false))
   }

   useEffect(() => {
    fetchPosts()
   }, [])
 
   if (loading) {
    return (
       <div className="flex w-full h-screen items-center justify-center">
          در حال دریافت اطلاعات
       </div>
    )
   }
 
   return (
    <div className="w-full flex flex-col gap-3">
       {posts.map((product: any, index: number) => (
          <PostRow key={product.id} data={product} onDelete={fetchPosts} />
       ))}
    </div>
   );
}

export default PostsList