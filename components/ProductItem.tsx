import Image from "next/image";
import React from "react";
import image from "@/app/images/hero.jpg";
import Link from "next/link";

interface ProductItemProps {
  data: any;
}

const ProductItem = ({ data }: ProductItemProps) => {
  return (
    <div className="bg-white rounded-xl hover:-translate-y-5 h-96
      hover:border hover:shadow-md hover:shadow-blue-200 hover:border-blue-500 transition-all duration-300">
      <Link href={`/products/${data.slug}`}>
        <Image
          src={data.images || image}
          alt=""
          width={300}
          height={200}
          className="w-full object-cover rounded-t-xl h-[200px]"
        />
      </Link>
      <div className="p-4 flex flex-col justify-between h-[180px]">
        <div>
          <p className="font-bold">{data.title}</p>
          <p className="text-sm mt-2">{data.price}</p>
        </div>
          <Link href={`/products/${data.slug}`} className="text-amber-500">
            اطلاعات بیشتر
          </Link>
      </div>
    </div>
  );
};

export default ProductItem;
