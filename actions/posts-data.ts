import { redirect } from "next/navigation";

export async function getPosts() {
  let posts: any = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}posts`,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    if (response.ok) {
      posts = await response.json();
    } else {
      posts = [];
    }
  } catch (e: any) {
    console.log(e);
    return redirect("/server-error");
  }
  return posts;
}

export async function getPostCategories() {
  let categories: any = [];

  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}post/categories`, {
    next: {
      revalidate: 5,
    },
  })
    .then(function (response) {
      if (response.ok) {
        categories = response.json();
      } else {
        categories = [];
      }
    })
    .catch(function (error) {
      console.log(error);
      return redirect("/server-error");
    });
  return categories;
}

export async function getSinglePost(slug: string) {
  let post: any = {};

  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}posts/${slug}`, {
    next: {
      revalidate: 5,
    },
  })
    .then(function (response) {
      if (response.ok) {
        post = response.json();
      } else {
        post = {};
      }
    })
    .catch(function (error) {
      console.log(error);
      return redirect("/server-error");
    });
  return post;
}

export async function getRelatedProducts(relatedCats: string) {
  let products: any = [];

  await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}related-products/${relatedCats}`,
    {
      next: {
        revalidate: 5,
      },
    }
  )
    .then(function (response) {
      if (response.ok) {
        products = response.json();
      } else {
        products = [];
      }
      products;
    })
    .catch(function (error) {
      console.log(error);
      return redirect("/server-error");
    });
  return products;
}
