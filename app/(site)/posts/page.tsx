import Header from '@/components/Header'
import PostsComp from '@/components/PostsComp'
import axios from 'axios'
import { redirect } from 'next/navigation'

export default async function Posts() {

  let posts: any
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}posts`)
      .catch(function (error) {
        console.log(error)
        return redirect('/server-error')
      })
      .then(function (response) {
        posts = response.data
      })

  let cats: any    
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}post/categories`)
      .then(function (response) {
        cats = response.data
      })
      .catch(function (error) {
        console.log(error)
        return redirect('/server-error')
      })

  if (posts.length == 0) {
    return (
      <div className='p-8'>
        <Header title='وبلاگ' />
        <p className='text-center p-10'>هنوز مطلبی موجود نیست</p>
      </div>
    )
  }

  return (
    <div className='py-8'>
      <Header title='وبلاگ' />
      <PostsComp data={posts} cats={cats} />
    </div>
  )
}
