"use client";

import { getPostCategories } from "@/actions/posts-data";
import Header from "@/app/(admin)/_components/Header";
import PostCatItem from "@/app/(admin)/_components/ui/PostCatItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PostCategories = () => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const categories = await getPostCategories();
    setCats(categories);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col gap-8">
         <Header pageTitle="دسته بندی های مقالات" />
         <div>در حال دریافت اطلاعات</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="دسته بندی های مقالات" />
      <div className="w-full flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">دسته بندی ها</h2>
          <div className="px-12 py-2 bg-amber-600 rounded-md text-white text-center cursor-pointer">
            <Link href="/dashboard/posts/categories/add">افزودن دسته</Link>
          </div>
        </div>
        <div className="mt-12">
         {cats.map((cat: any) => (
            <PostCatItem data={cat} key={cat.id} onDelete={fetchData} />
         ))}
        </div>
      </div>
    </div>
  );
};

export default PostCategories;
