import axios from "axios";

export async function getPostCategory() {
  let category: any;
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}post/categories`)
    .then(function (response) {
      category = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return category;
}

export async function getProductCategory() {
  let category: any = [];
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}product/categories`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
    .then(function (response) {
      category = response.data;
    })
    .catch(function (error) {
      category = []
      console.log(error, "GET_PRODUCT_CATEGORY_ERROR");
    });
  return category;
}

export default async function getCategory(id: number) {
  let category: any;
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/post/categories/${id}`)
    .then(function (response) {
      category = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return category;
}
