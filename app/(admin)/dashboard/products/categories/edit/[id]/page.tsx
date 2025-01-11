'use client';

import { getProductCat } from "@/actions/get-category";
import Header from "@/app/(admin)/_components/Header";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface EditProductCategoryProps {
  params: {
    id: string;
  };
}

const EditProductCategory = ({ params }: EditProductCategoryProps) => {
  const [formData, setFormData]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userToken = getCookie("token");
  const router = useRouter();

  const fetchData = async () => {
    const category = await getProductCat(params.id);
    setFormData({
      title: category.title,
      description: category.description,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    const newForm = new FormData();
    newForm.append("title", formData.title);
    newForm.append("description", formData.description);

    setIsLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}product/categories/${params.id}/edit`,
        newForm,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          toast.success("دسته با موفقت ویرایش شد");
          router.push("/dashboard/products/categories");
        } else {
          toast.error("خطا در ویرایش دسته بندی");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در ویرایش دسته بندی");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="ویرایش دسته بندی" />
      <div className="w-full flex flex-col gap-8 p-8">
        <h2 className="text-xl font-semibold">مشخصات دسته بندی</h2>
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            name="title"
            placeholder="عنوان دسته"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
          />
          <textarea
            name="description"
            id=""
            placeholder="توضیحات دسته"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
          ></textarea>
          <button
            onClick={handleClick}
            className={`bg-blue-500 text-white rounded-md w-56 px-6 py-2 ${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"
            }`}
          >
            {isLoading ? "در حال ارسال..." : "ویرایش دسته"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductCategory;
