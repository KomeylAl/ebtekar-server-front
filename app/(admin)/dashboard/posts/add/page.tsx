"use client";

import { getPostCategory, getProductCategory } from "@/actions/get-category";
import Header from "@/app/(admin)/_components/Header";
import TextEditor from "@/app/(admin)/_components/TextEditor";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactSelect from "react-select";

const AddPost = () => {
  const [sendLoading, setSendLoading]: any = useState(false);

  const [cats, setCats]: any = useState([]);
  const [relatedCats, setRelatedCats]: any = useState([]);
  const [selectedCategory, setSelectedCategory]: any = useState();
  const [selectedRelatedCat, setSelectedRelatedCat]: any = useState();

  const [title, setTitle]: any = useState("");
  const [slug, setSlug]: any = useState("");
  const [content, setContent]: any = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile]: any = useState("");

  const router = useRouter();

  const catsOptions: any = [];
  const relatedCatsOptions: any = [];

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption.value);
  };

  const handleRelatedCategoryChange = (selectedOption: any) => {
    setSelectedRelatedCat(selectedOption.value);
  };

  const fetchData = async () => {
    let categories: any;
    categories = await getPostCategory();
    setCats(categories);

    let relatedCats: any;
    relatedCats = await getProductCategory();
    setRelatedCats(relatedCats);
  };

  useEffect(() => {
    fetchData();
  }, []);

  cats.map((cat: any) => {
    catsOptions.push({
      value: cat.id,
      label: cat.title,
    });
  });

  relatedCats.map((cat: any) => {
    relatedCatsOptions.push({
      value: cat.id,
      label: cat.title,
    });
  });

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    console.log(file)
  }

  const handleSubmit = async () => {

    const newData = new FormData();
    newData.append("title", title);
    newData.append("slug", slug);
    newData.append("body", content);
    newData.append("description", description);
    newData.append("category", selectedCategory);
    newData.append("related_cat", selectedRelatedCat);
    newData.append("image", file);

    setSendLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}posts/add`, newData)
    .then(function (response) {
      if (response.status === 201) {
        toast.success('مطلب با موفقیت افزوده شد')
        router.push('/dashboard/posts')
      } else {
        toast.error('خطا در افزودن مطلب')
      }
    })
    .catch(function (error) {
      console.log(error)
      toast.error('خطا در افزودن مطلب')
    })
    .finally(() => setSendLoading(false))
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="افزودن مطلب" />
      <div className="w-full flex flex-col p-8">
        <div className="h-fit flex flex-col p-4">
          <div className="mt-4 flex flex-col gap-10">
            <div className="w-full">
              <h2 className="text-xl">عنوان مطلب</h2>
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
                <h2 className="text-xl">تصویر مطلب</h2>
                <input
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
                />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-xl">توضیحات کوتاه</h2> 
              <textarea name="description" id="desc"
                onChange={(e: any) => setDescription(e.target.value)}
                className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
              ></textarea>
            </div>
            <div className="w-full">
              <h2 className="text-xl mb-4">محتوای مطلب</h2>
              <TextEditor value={content} onChange={setContent} />
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
                <label>دسته بندی محصولات مرتبط</label>
                <ReactSelect
                  className="mt-3 focus:ring-black focus:border-black"
                  placeholder="دسته بندی محصولات مرتبط"
                  defaultInputValue={selectedRelatedCat}
                  onChange={handleRelatedCategoryChange}
                  options={relatedCatsOptions}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className={`bg-amber-600 px-8 py-2 w-72 rounded-md text-white text-lg
                ${sendLoading ? "cursor-not-allowed bg-amber-300" : ""}
              `}
            >
              افزودن مطلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
