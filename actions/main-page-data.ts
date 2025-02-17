export async function heroData() {
  let hero: any = {};
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}hero`,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    if (response.ok) {
      hero = await response.json();
    } else {
      hero = {
        company_name: "ماشین سازی ابتکار صنعت اسپادانا",
        description: "",
        logo_path: "",
      };
    }
  } catch (e: any) {
    console.log(e);
  }
  return hero;
}

export async function footerData() {
  let footer: any = {};
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}footer`,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    if (response.ok) {
      footer = await response.json();
    } else {
      footer = {
        company_name: "ماشین سازی ابتکار صنعت اسپادانا",
        description: "",
        logo_path: "",
        bg_path: "",
      };
    }
  } catch (e: any) {
    console.log(e);
  }
  return footer;
}

export async function mainPagePostsData() {
  let posts: any;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}main-page-posts`,
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
  }

  return posts;
}

export async function mainPageComments() {
  let comments: any;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}comments`,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    if (response.ok) {
      comments = await response.json();
    } else {
      comments = [];
    }
  } catch (e: any) {
    console.log(e);
  }

  return comments;
}

export async function mainPageProductsData() {
  let products: any;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}main-page-products`,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    if (response.ok) {
      products = await response.json();
    } else {
      products = [];
    }
  } catch (e: any) {
    console.log(e);
  }

  return products;
}

export async function mainPageAbout() {
  let about: any = {};
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}info`,
      {
        next: {
          revalidate: 5,
        },
      }
    );
    if (response.ok) {
      about = await response.json();
    } else {
      about = {
        company_name: "ماشین سازی ابتکار صنعت اسپادانا",
        description: "",
        logo_path: "",
      };
    }
  } catch (e: any) {
    console.log(e);
  }

  return about;
}
