import { getRelatedProducts, getSinglePost } from "@/actions/posts-data";
import Header from "@/components/Header";
import SinglePostComp from "@/components/SinglePostComp";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function Post({ params }: PostPageProps) {
  const post = await getSinglePost(params.slug);
  const relatedProducts = await getRelatedProducts(post.related_cats);

  return (
    <div className="py-8">
      <Header title={post.title} />
      <div>
        <SinglePostComp data={post} products={relatedProducts} />
      </div>
    </div>
  );
}
