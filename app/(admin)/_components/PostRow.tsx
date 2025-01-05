import Link from "next/link";
import React from "react";

interface PostRowProps {
  data: any;
}

const PostRow = ({ data }: PostRowProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-blue-500">{data.id}</p>
        <h2 className="">{data.title}</h2>
        <p>{data.slug}</p>
        <p>{data.category}</p>
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/posts/edit/${data.slug}`}
            className="bg-blue-500 text-white rounded-md px-6 py-2"
          >
            ویرایش مطلب
          </Link>
          <button className="bg-rose-500 text-white rounded-md px-6 py-2">
            حذف مطلب
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostRow;
