import Image from "next/image";
import React from "react";
import image from "@/app/images/hero.jpg";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

interface PostItemProps {
  data: any;
}

const PostItem = ({ data }: PostItemProps) => {

  function previewText(text: string, maxLength = 100) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  const previewDesc = previewText(data.body, 150)

  return (
    <div className="bg-white relative rounded-tl-[50px] rounded-br-[50px] hover:shadow-md transition-all duration-400">
      <Link href={`/posts/${data.slug}`}>
        <Image
          src={data.img_path || image}
          width={300}
          height={140}
          alt={data.title}
          className="w-full object-cover rounded-tl-[50px] rounded-br-[50px]"
        />
      </Link>
      <div className="p-4">
        <Link href={`/posts/${data.slug}`}>
          <p className="font-bold">{data.title}</p>
        </Link>
        <p className="text-[12px] mt-2">
          {previewDesc}
        </p>
      </div>
      <div className="mt-9 flex items-center justify-between">
        <div className="w-1 h-1" />
        <Link
          href={`/posts/${data.slug}`}
          className="bg-amber-500 p-2 rounded-tr-[30px] text-white"
        >
          <FaArrowLeft size={25} />
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
