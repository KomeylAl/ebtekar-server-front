"use client";

import { getPostCategory, getProductCategory } from "@/actions/get-category";
import Header from "@/app/(admin)/_components/Header";
import TextEditor from "@/app/(admin)/_components/TextEditor";
import FileUploader from "@/app/(admin)/_components/ui/FileUploader";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
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
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    description: "",
  });
  const [file, setFile]: any = useState("");

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
    const noBackgroundContent = sanitizedContent.replace(
      /background-color\s*:\s*[^;]+;?/g,
      ""
    );
  
    setContent(noBackgroundContent);
    setFormData((prev: any) => ({ ...prev, content: noBackgroundContent }));
  };

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
    newData.append("title", formData.title);
    newData.append("slug", formData.slug);
    newData.append("body", formData.content);
    newData.append("description", formData.description);
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
      <div className="w-full flex justify-between gap-8 p-8">
        <div className="w-full">
          <h2 className="text-lg">مشخصات مطلب</h2>
          <div className="w-full flex gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e: any) =>
                setFormData((prev: any) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
            />
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={(e: any) =>
                setFormData((prev: any) => ({
                  ...prev,
                  slug: e.target.value,
                }))
              }
              className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
            />
          </div>
          <div className="w-full mt-6">
            <p className="text-[13px] text-gray-700 text-justify">
              توضیحات کوتاه مطلب برای توضیحات متای سئو استفاده میشود. سعی کنید
              چند خط کوتاه درباره مطلب توضیح دهید تا خوانندگان از گوگل بتوانند
              بفهمند مطلب شما چیست. همچنین از عبارات درست استفاده کنید تا گوگل
              به درستی متوجه منظور شما شده و بهترین عملکرد را برای شما داشته
              باشد.
            </p>
            <textarea
              name="description"
              id="desc"
              value={formData.description}
              onChange={(e: any) =>
                setFormData((prev: any) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full mt-3 bg-white rounded-md shadow-sm p-3"
            />
          </div>
          <div className="w-full mt-6">
            <TextEditor
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>
        </div>
        <div className="w-72 bg-gray-700/5 rounded-md p-8">
          <h3>افزودن مطلب</h3>
          <p className="text-[11px] text-gray-700 text-justify mt-3">
            لطفا توجه کنید قبل از انتشار مطلب همه اطلاعات را به درستی وارد کرده
            باشید. هر زمان بخواهید میتوانید دوبراه مطلب را ویرایش کنید.
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
            {sendLoading ? "در حال ارسال..." : "افزودن مطلب"}
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
            <label>دسته بندی محصولات مرتبط</label>
            <ReactSelect
              className="mt-3 focus:ring-black focus:border-black text-sm"
              placeholder="دسته بندی محصولات مرتبط"
              defaultInputValue={selectedCategory}
              onChange={handleRelatedCategoryChange}
              options={relatedCatsOptions}
            />
          </div>
          <div className="w-full mt-6">
            <h2 className="mb-3">تصویر مطلب</h2>
            <FileUploader
              onFilesSelected={(file: any) => setFile(file[0])}
              images={[]}
              allowMultiple={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
