import { notFound, redirect } from "next/navigation";

export async function getProductData(slug: string) {
  let product: any = {};
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products/${slug}`, {
      next: {
        revalidate: 5
      }
    })
    if (response.ok) {
      product = await response.json()
    } else if (response.status === 404) {
      notFound()
    } else {
      product = {}
    }
  } catch (e: any) {
    console.log(e)
    return redirect("/server-error");
  }
  return product;
}

export async function getProducts() {
  let products: any = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products`, {
      next: {
        revalidate: 5
      }
    })
    if (response.ok) {
      products = await response.json()
    } else {
      products = []
    }
  } catch (e: any) {
    console.log(e)
    return redirect("/server-error");
  }
  return products;
}

export async function getCategories() {
  let categories: any = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}product/categories`, {
      next: {
        revalidate: 5
      }
    })
    if (response.ok) {
      categories = await response.json()
    } else {
      categories = []
    }
  } catch (e: any) {
    console.log(e)
    return redirect("/server-error");
  }
  return categories;
}
