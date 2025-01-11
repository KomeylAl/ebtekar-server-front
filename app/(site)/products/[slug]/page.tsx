import { getProductData } from "@/actions/products-data";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import { generateDescription } from "@/lib/data-utils";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BiPhone } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: ProductPageProps,
): Promise<Metadata> {
  const { slug } = params;
  const product = await getProductData(slug);
  const description = generateDescription(product.meta_description);
  return {
    title: `${product.title} - ابتکار صنعت اسپادانا`,
    description: description,
  };
}

export default async function Product({ params }: ProductPageProps) {
  const product = await getProductData(params.slug);

  const date = new Date(product.created_at);
  const jalali_date = date.toLocaleDateString("fa-IR");

  return (
    <div className="py-8 flex flex-col">
      <Header title={product.title} />
      <div className="flex flex-col-reverse xl:flex-row justify-between mt-9 gap-6">
        <div className="flex flex-col w-full xl:w-[70%] rounded-xl">
          <ProductGallery images={product.images} />
          <div className="w-full p-8 bg-white bg-opacity-70 mt-9 rounded-xl">
            <div className="flex gap-6 items-center">
              <p className="text-gray-400 flex gap-3 items-center">
                <MdWatchLater size={20} /> {jalali_date}
              </p>
              <Link href="/" className="text-gray-400 flex gap-3 items-center">
                <FaFolder size={20} /> {product.category}
              </Link>
            </div>
            <div
              className="mt-4" 
              dangerouslySetInnerHTML={{ __html: product.body }} />
            {/* <p>{product.description}</p> */}
          </div>
        </div>
        <div className="w-full xl:w-[28%]">
          <div className="w-full p-8 text-center bg-white rounded-xl shadow-md">
            <p className="text-lg">قیمت محصول</p>
            <p className="text-xl font-bold mt-4">{product.price}</p>
          </div>
          <div className="mt-4 bg-amber-500 rounded-md text-center p-4 text-white text-xl">
            <Link href="/order" className="flex items-center gap-2 justify-center flex-row-reverse">ثبت سفارش</Link>
          </div>
          <div className="mt-4 bg-blue-500 rounded-md text-center p-4 text-white text-xl">
            <Link href="tel:09131373073" className="flex items-center gap-2 justify-center flex-row-reverse">تماس <BiPhone /></Link>
          </div>
          <div className="mt-4 bg-green-500 rounded-md text-center p-4 text-white text-xl">
            <Link href="https://wa.me/+989131373073" target="_blank" className="flex items-center gap-2 justify-center flex-row-reverse">واتساپ <BsWhatsapp /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
