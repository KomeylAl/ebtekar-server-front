import Header from '@/components/Header'
import SinglePostComp from '@/components/SinglePostComp'
import axios from 'axios'
import { redirect } from 'next/navigation'

interface PostPageProps {
    params: {
        slug: string,
    }
}


export default async function Post({ params }: PostPageProps) {

  let data: any
  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}posts/${params.slug}`, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  })
    .then(function (response) {
      data = response.data
    })
    .catch(function (error) {
      console.log(error)
      return redirect('/server-error')
    })
  const post = data

  let relatedProducts: any = []
  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}related-products/${data.related_cat}`, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  })
    .then(function (response) {
      relatedProducts = response.data
      // console.log(relatedProducts)
    })
    .catch(function (error) {
      console.log(error)
    })

  return (
    <div className='py-8'>
      <Header title={data.title} />
      <div>
        <SinglePostComp data={post} products={relatedProducts} />
      </div>
    </div>
  )
}