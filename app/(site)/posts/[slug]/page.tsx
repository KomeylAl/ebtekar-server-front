import { getRelatedProducts, getSinglePost } from "@/actions/posts-data";
import Header from "@/components/Header";
import SinglePostComp from "@/components/SinglePostComp";
import { generateDescription } from "@/lib/data-utils";
import { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: PostPageProps,
): Promise<Metadata> {
  const { slug } = params;
  const post = await getSinglePost(slug);
  const description = generateDescription(post.meta_description);
  return {
    title: `${post.title} - ابتکار صنعت اسپادانا`,
    description: description,
  };
}

export default async function Post({ params }: PostPageProps) {
  const post = await getSinglePost(params.slug);
  const relatedProducts = await getRelatedProducts(post.related_cat);

  return (
    <div className="py-8">
      <Header title={post.title} />
      <div>
        <SinglePostComp data={post} products={relatedProducts} />
      </div>
    </div>
  );
}
