"use client";

import { getProductCategory } from "@/actions/get-category";
import Header from "@/app/(admin)/_components/Header";
import TextEditor from "@/app/(admin)/_components/TextEditor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactSelect from "react-select";
import DOMPurify from "dompurify";
import FileUploader from "@/app/(admin)/_components/ui/FileUploader";

const AddProduct = () => {
  const [sendLoading, setSendLoading]: any = useState(false);

  const [cats, setCats] = useState([]);
  const [selectedCategory, setSelectedCategory]: any = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent]: any = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setUploadedImages(files);
  };

  const catsOptions: any = [];

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption.value);
  };

  const fetchData = async () => {
    const cats = await getProductCategory();
    setCats(cats);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!cats) {
    catsOptions.push({
      value: "",
      label: "",
    });
  } else {
    cats.map((cat: any) => {
      catsOptions.push({
        value: cat.id,
        label: cat.title,
      });
    });
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newForm = new FormData();

    newForm.append("title", title);
    newForm.append("slug", slug);
    newForm.append("body", content);
    newForm.append("description", description);
    newForm.append("price", price);
    newForm.append("product_categories_id", selectedCategory);
    uploadedImages.forEach((file: any, index: any) => {
      newForm.append(`images[${index}]`, file);
    });

    if (
      !title ||
      !slug ||
      !description ||
      !content ||
      !selectedCategory ||
      !price
    ) {
      toast.error("لطفا همه فیلد ها را پر کنید");
    } else {
      setSendLoading(true);
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products/add`, newForm)
        .then(function (response) {
          if (response.status === 201) {
            toast.success("محصول با موفقیت افزوده شد");
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => setSendLoading(false));
    }
  };

  if (!cats) {
    toast.error("خطا در دریافت اطلاعات دسته بندی");
  }

  const handleContentChange = (value: any) => {
    const sanitizedContent = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [
        "b",
        "i",
        "u",
        "a",
        "span",
        "p",
        "div",
        "br",
        "ul",
        "li",
        "ol",
        "strong",
      ],
      ALLOWED_ATTR: ["href", "target", "style", "class"],
    });

    // حذف ویژگی `background-color` از استایل‌ها
    const noBackgroundContent = sanitizedContent.replace(
      /background-color\s*:\s*[^;]+;?/g,
      "" // حذف استایل `background-color`
    );

    setContent(noBackgroundContent);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="افزودن محصول" />
      <div className="w-full flex justify-between gap-8 p-8">
        <div className="w-full">
          <h2 className="text-lg">مشخصات محصول</h2>
          <div className="w-full flex gap-4">
            <input
              type="text"
              name="title"
              placeholder="عنوان محصول"
              onChange={(e: any) => setTitle(e.target.value)}
              className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
            />
            <input
              type="text"
              name="slug"
              placeholder="اسلاگ"
              onChange={(e: any) => setSlug(e.target.value)}
              className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
            />
          </div>
          <div className="w-full mt-6">
            <p className="text-[13px] text-gray-700 text-justify">
              توضیحات کوتاه محصول برای توضیحات متای سئو استفاده میشود. سعی کنید
              چند خط کوتاه درباره محصول توضیح دهید تا خوانندگان از گوگل بتوانند
              بفهمند محصول شما چیست. همچنین از عبارات درست استفاده کنید تا گوگل
              به درستی متوجه منظور شما شده و بهترین عملکرد را برای شما داشته
              باشد.
            </p>
            <textarea
              name="description"
              id="desc"
              placeholder="توضیحات کوتاه"
              onChange={(e: any) => setDescription(e.target.value)}
              className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
            ></textarea>
          </div>
          <div className="w-full mt-6">
            <TextEditor value={content} onChange={handleContentChange} />
          </div>
        </div>
        <div className="w-72 bg-gray-700/5 rounded-md p-8">
          <h3>انتشار محصول</h3>
          <p className="text-[11px] text-gray-700 text-justify mt-3">
            لطفا توجه کنید قبل از انتشار محصول همه اطلاعات را به درستی وارد کرده
            باشید. هر زمان بخواهید میتوانید دوبراه محصول را ویرایش کنید.
          </p>
          <button
            onClick={handleSubmit}
            className={`w-full py-2 text-white rounded-md mt-5
                  ${
                    sendLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600"
                  }
                `}
          >
            {sendLoading ? "در حال ارسال..." : "افزودن محصول"}
          </button>
          <div className="w-full mt-6">
            <label>انتخاب دسته بندی</label>
            <ReactSelect
              className="mt-3 focus:ring-black focus:border-black text-sm"
              placeholder="انتخاب دسته بندی"
              defaultInputValue={selectedCategory}
              onChange={handleCategoryChange}
              options={catsOptions}
            />
          </div>
          <div className="w-full mt-6">
            <h2 className="">قیمت</h2>
            <input
              type="text"
              name="price"
              placeholder="قیمت"
              onChange={(e: any) => setPrice(e.target.value)}
              className="w-full mt-3 bg-transparent border border-gray-400 text-[13px] rounded-md shadow-sm p-2"
            />
          </div>
          <div className="w-full mt-6 flex flex-col items-start">
            <h2 className="mb-3">تصاویر محصول</h2>
            <FileUploader onFilesSelected={handleFilesSelected} images={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
