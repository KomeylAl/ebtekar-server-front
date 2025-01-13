import { getPostCategories, getPosts } from '@/actions/posts-data'
import Header from '@/components/Header'
import PostsComp from '@/components/PostsComp'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "وبلاگ - ابتکار صنعت اسپادانا",
  description:
    "شرکت ماشین سازی ابتکار صنعت اسپادانا با سال‌ها تجربه در طراحی و ساخت ماشین‌آلات صنعتی، به عنوان یکی از پیشگامان این حوزه در ایران شناخته می‌شود. این شرکت با تکیه بر دانش فنی متخصصان داخلی و بهره‌گیری از فناوری‌های روز دنیا، محصولات متنوع و باکیفیتی را برای صنایع مختلف ارائه می‌دهد.",
};

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
