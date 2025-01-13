import { getCategories, getProducts } from "@/actions/products-data";
import Header from "@/components/Header";
import ShopComp from "@/components/ShopComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات - ابتکار صنعت اسپادانا",
  description:
    "شرکت ماشین سازی ابتکار صنعت اسپادانا با سال‌ها تجربه در طراحی و ساخت ماشین‌آلات صنعتی، به عنوان یکی از پیشگامان این حوزه در ایران شناخته می‌شود. این شرکت با تکیه بر دانش فنی متخصصان داخلی و بهره‌گیری از فناوری‌های روز دنیا، محصولات متنوع و باکیفیتی را برای صنایع مختلف ارائه می‌دهد.",
};

export default async function Products() {
  const products = await getProducts();
  const cats = await getCategories();

  if (products.length === 0) {
    return (
      <div className="p-8">
        <Header title="محصولات" />
        <p className="text-center p-10">هنوز محصولی موجود نیست</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Header title="محصولات" />
      <ShopComp data={products} cats={cats} />
    </div>
  );
}
