import axios from "axios";

export async function heroData() {
  let hero: any = {};
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}hero`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
    .then(function (response) {
      hero = response.data;
    })
    .catch(function (error) {
      console.log(error);

      hero = {
        company_name: "ماشین سازی ابتکار صنعت اسپادانا",
        description: "",
        logo_path: "",
      };
    });

  return hero;
}

export async function mainPagePostsData() {
  let posts: any = [];
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}main-page-posts`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
    .then(function (response) {
      posts = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return posts;
}

export async function mainPageProductsData() {
  let products: any;
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}main-page-products`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
    .then(function (response) {
      products = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return products;
}

export async function mainPageAbout() {
  let about: any = {};
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}info`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
    .then(function (response) {
      about = response.data;
    })
    .catch(function (error) {
      console.log(error);

      about = {
        company_name: "ماشین سازی ابتکار صنعت اسپادانا",
        description: "",
        logo_path: "",
      };
    });

  return about;
}
