import axios from "axios";
import { notFound, redirect } from "next/navigation";

export async function getProductData(slug: string) {
  let product: any = {};
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products/${slug}`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
    .then(function (response) {
      product = response.data;
    })
    .catch(function (error) {
      console.log(error);
      if (error.status === 404) {
        notFound();
      }
      return redirect("/server-error");
    });

  return product;
}
