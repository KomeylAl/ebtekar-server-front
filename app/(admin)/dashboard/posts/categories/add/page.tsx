"use client";

import Header from "@/app/(admin)/_components/Header";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddPostCategory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userToken = getCookie("token");
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}post/categories/add`,
        {
          title,
          description,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 201) {
          toast.success("دسته با موفقت افزوده شد");
          router.push("/dashboard/posts/categories");
        } else {
          toast.error("خطا در افزودن دسته بندی");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در افزودن دسته بندی");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="افزودن دسته بندی" />
      <div className="w-full flex flex-col gap-8 p-8">
        <h2 className="text-xl font-semibold">مشخصات دسته بندی</h2>
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            name="title"
            placeholder="عنوان دسته"
            onChange={(e: any) => setTitle(e.target.value)}
            className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
          />
          <textarea
            name=""
            id=""
            placeholder="توضیحات دسته"
            onChange={(e: any) => setDescription(e.target.value)}
            className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
          ></textarea>
          <button
            onClick={handleClick}
            className={`bg-blue-500 text-white rounded-md w-56 px-6 py-2 ${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"
            }`}
          >
            {isLoading ? "در حال ارسال..." : "افزودن دسته"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostCategory;
