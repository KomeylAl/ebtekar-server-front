"use client";

import React, { useEffect, useState } from "react";
import Header from "../../_components/Header";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Info = () => {
  const router = useRouter();

  const [loading, setLoading]: any = useState(false);
  const [sendLoading, setSendLoading]: any = useState(false);
  const [info, setInfo]: any = useState({});

  const [formData, setFormData]: any = useState({
    company_name: "",
    description: "",
    phone_numbers: "",
    address: "",
    email: "",
  });
  const [file, setFile]: any = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}info`)
        .then(function (response) {
          setInfo(response.data);
        })
        .catch(function (error) {
          console.log(error.data);
          toast.error("خطا در دریافت اطلاعات شرکت");
        })
        .finally(() => setLoading(false));
    };

    fetchInfo();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const newData = new FormData();
    newData.append("company_name", formData.company_name || info.company_name);
    newData.append("description", formData.description || info.description);
    newData.append("address", formData.address || info.address);
    newData.append(
      "phone_numbers",
      formData.phone_numbers || info.phone_numbers
    );
    newData.append("email", formData.email || info.email);
    newData.append("image", file);

    setSendLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}info/${info.id}/edit`,
        newData
      )
      .then(function (response) {
        if (response.status === 200) {
          toast.success("اطلاعات با موفقیت بروز رسانی شد");
          router.push("/dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در بروز رسانی اطلاعات");
      })
      .finally(() => setSendLoading(false));
  };

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        در حال دریافت اطلاعات
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="ویرایش اطلاعات شرکت" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col p-4">
          <div className="w-full flex flex-col gap-3">
            <h2>نام شرکت</h2>
            <input
              placeholder={info.company_name}
              name="company_name"
              onChange={handleInputChange}
              className="w-full bg-white rounded-md shadow-sm p-3"
            />
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <h2>درباره شرکت</h2>
            <textarea
              placeholder={info.description}
              name="description"
              onChange={handleInputChange}
              className="w-full bg-white rounded-md shadow-sm p-3"
            />
          </div>
          <div className="w-full flex gap-3 mt-8">
            <div className="w-full flex flex-col gap-3">
              <h2>آدرس</h2>
              <input
                placeholder={info.address}
                name="address"
                onChange={handleInputChange}
                className="w-full bg-white rounded-md shadow-sm p-3"
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <h2>ایمیل</h2>
              <input
                placeholder={info.email}
                name="email"
                onChange={handleInputChange}
                className="w-full bg-white rounded-md shadow-sm p-3"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <h2>شماره های تماس</h2>
            <input
              placeholder={info.phone_numbers}
              name="phone_numbers"
              onChange={handleInputChange}
              className="w-full bg-white rounded-md shadow-sm p-3"
            />
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <h2>تصویر لوگو</h2>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full bg-white rounded-md shadow-sm p-3"
            />
          </div>
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className={`bg-amber-600 px-8 py-2 rounded-md text-white text-lg
                ${sendLoading ? "cursor-not-allowed bg-amber-300" : ""}
              `}
            >
              ویرایش اطلاعات شرکت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
