"use client";

import { getProductCategory } from "@/actions/get-category";
import Header from "@/app/(admin)/_components/Header";
import TextEditor from "@/app/(admin)/_components/TextEditor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactSelect from "react-select";
import DOMPurify from "dompurify";

const AddProduct = () => {
  const [sendLoading, setSendLoading]: any = useState(false);

  const [cats, setCats] = useState([]);
  const [selectedCategory, setSelectedCategory]: any = useState();

  const [title, setTitle]: any = useState("");
  const [slug, setSlug]: any = useState("");
  const [content, setContent]: any = useState("");
  const [description, setDescription]: any = useState("");
  const [price, setPrice]: any = useState("");
  const [files, setFiles]: any = useState<File[]>([]);

  const catsOptions: any = [];

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption.value);
  };

  const fetchData = async () => {
    const cats = await getProductCategory()
    setCats(cats)
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (files.length > 4) {
      toast.error("حداکثر می‌توانید 4 تصویر انتخاب کنید.");
      return;
    }

    setFiles(Array.from(files));
  };

  useEffect(() => {
    fetchData()
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
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("body", content);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("product_categories_id", selectedCategory);
    files.forEach((file: any, index: any) => {
      formData.append(`images[${index}]`, file);
    })

    setSendLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products/add`, formData)
    .then(function (response) {
      if (response.status === 201) {
        toast.success('محصول با موفقیت افزوده شد')
      }
    })
    .catch(function (error) {
      console.log(error)
    }).finally(() => setSendLoading(false))
  };

  if (!cats) {
    toast.error('خطا در دریافت اطلاعات دسته بندی')
  }

  const handleContentChange = (value: any) => {
    const sanitizedContent = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: ["b", "i", "u", "a", "span", "p", "div", "br", "ul", "li", "ol", "strong"],
      ALLOWED_ATTR: ["href", "target", "style", "class"],
    });
  
    // حذف ویژگی `background-color` از استایل‌ها
    const noBackgroundContent = sanitizedContent.replace(
      /background-color\s*:\s*[^;]+;?/g,
      "" // حذف استایل `background-color`
    );
  
    setContent(noBackgroundContent);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="افزودن محصول" />
      <div className="w-full flex flex-col p-8">
        <div className="h-fit flex flex-col p-4">
          <div className="mt-4 flex flex-col gap-10">
            <div className="w-full">
              <h2 className="text-xl">عنوان محصول</h2>
              <input
                type="text"
                name="title"
                onChange={(e: any) => setTitle(e.target.value)}
                className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
              />
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full">
                <h2 className="text-xl">اسلاگ</h2>
                <input
                  type="text"
                  name="slug"
                  onChange={(e: any) => setSlug(e.target.value)}
                  className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
                />
              </div>
              <div className="w-full">
                <h2 className="text-xl">تصاویر محصول</h2>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  multiple
                  max={4}
                  name="image"
                  onChange={handleFileChange}
                  className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
                />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-xl mb-4">توضیحات کوتاه</h2>
              <textarea name="description" id="desc"
                onChange={(e: any) => setDescription(e.target.value)}
                className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
              ></textarea>
            </div>
            <div className="w-full">
              <h2 className="text-xl mb-4">محتوای محصول</h2>
              <TextEditor value={content} onChange={handleContentChange} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-full">
                <label>انتخاب دسته بندی</label>
                <ReactSelect
                  className="mt-3 focus:ring-black focus:border-black"
                  placeholder="انتخاب دسته بندی"
                  defaultInputValue={selectedCategory}
                  onChange={handleCategoryChange}
                  options={catsOptions}
                />
              </div>
              <div className="w-full">
                <h2 className="text-xl">قیمت</h2>
                <input
                  type="text"
                  name="price"
                  onChange={(e: any) => setPrice(e.target.value)}
                  className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className={`bg-amber-600 px-8 py-2 w-72 rounded-md text-white text-lg
              ${sendLoading ? "cursor-not-allowed bg-amber-300" : ""}
            `}
            >
              افزودن محصول
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
