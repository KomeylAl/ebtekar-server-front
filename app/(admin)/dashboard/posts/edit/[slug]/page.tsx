"use client";

import { getPostCategory, getProductCategory } from "@/actions/get-category";
import { getSinglePost } from "@/actions/posts-data";
import Header from "@/app/(admin)/_components/Header";
import TextEditor from "@/app/(admin)/_components/TextEditor";
import FileUploader from "@/app/(admin)/_components/ui/FileUploader";
import axios from "axios";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactSelect from "react-select";
import { PuffLoader } from "react-spinners";

interface EditPostProps {
  params: {
    slug: string;
  };
}

const EditPost = ({ params }: EditPostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sendLoading, setSendLoading]: any = useState(false);

  const [cats, setCats]: any = useState([]);
  const [relatedCats, setRelatedCats]: any = useState([]);
  const [selectedCategory, setSelectedCategory]: any = useState();
  const [selectedRelatedCat, setSelectedRelatedCat]: any = useState();
  const [file, setFile]: any = useState(null);
  const [content, setContent] = useState("");

  const router = useRouter();

  const catsOptions: any = [];
  const relatedCatsOptions: any = [];

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    description: "",
  });
  const [post, setPost]: any = useState({});

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption.value);
  };

  const handleRelatedCategoryChange = (selectedOption: any) => {
    setSelectedRelatedCat(selectedOption.value);
  };

  const fetchData = async () => {
    setIsLoading(true);
    let categories: any;
    categories = await getPostCategory();
    setCats(categories);

    let relatedCats: any;
    relatedCats = await getProductCategory();
    setRelatedCats(relatedCats);

    const post = await getSinglePost(params.slug);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.body,
      description: post.meta_description,
    });
    setPost(post);
    setIsLoading(false);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newForm = new FormData();

    newForm.append("title", formData.title);
    newForm.append("slug", formData.slug);
    newForm.append("body", formData.content);
    newForm.append("description", formData.description);
    newForm.append("category", selectedCategory || post.post_categories_id);
    newForm.append(
      "related_cat",
      selectedRelatedCat || post.product_categories_id
    );
    newForm.append("image", file);

    console.log(newForm);

    setSendLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}posts/${params.slug}/edit`,
        newForm
      )
      .then(function (response) {
        if (response.status === 200) {
          toast.success("مطلب با موفقیت ویرایش شد");
          router.push("/dashboard/posts");
        } else {
          console.log(response.data);
          toast.error("خطا در ویرایش مطلب");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در ویرایش مطلب");
      })
      .finally(() => setSendLoading(false));
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Header pageTitle="ویرایش مطلب" />
        <div className="w-full h-screen flex items-center justify-center">
          <PuffLoader color="#03a9fc" size={80} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="ویرایش مطلب" />
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
          <h3>ویرایش مطلب</h3>
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
            {sendLoading ? "در حال ارسال..." : "ویرایش مطلب"}
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
              options={catsOptions}
            />
          </div>
          <div className="w-full mt-6">
            <h2 className="mb-3">تصویر مطلب</h2>
            <FileUploader
              onFilesSelected={(file: any) => setFile(file[0])}
              images={[{ img_path: post.img_path }]}
              allowMultiple={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
