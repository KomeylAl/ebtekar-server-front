import { getPostCategories, getPosts } from '@/actions/posts-data'
import Header from '@/components/Header'
import PostsComp from '@/components/PostsComp'

export default async function Posts() {

  const posts = await getPosts();
  const cats = await getPostCategories();

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
