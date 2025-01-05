"use client";

import React, { useEffect, useState } from "react";
import Header from "../../_components/Header";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Hero = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [hero, setHero]: any = useState({});

  const [formData, setFormData]: any = useState({
    main_title: "",
    description: "",
  });
  const [logo, setLogo]: any = useState(null);
  const [back, setBack]: any = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}hero`)
        .then(function (response) {
          setHero(response.data);
        })
        .catch(function (error) {
          console.log(error.data);
          toast.error("خطا در دریافت اطلاعات");
        })
        .finally(() => setLoading(false));
    };

    fetchHero();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: any) => {
    setLogo(e.target.files[0]);
  };

  const handleBackChange = (e: any) => {
    setBack(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const newData = new FormData();
    newData.append("main_title", formData.main_title || hero.main_title);
    newData.append("description", formData.description || hero.description);
    newData.append("logo", logo);
    newData.append("back", back);

    setSendLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}hero/${hero.id}/edit`,
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
      <Header pageTitle="ویرایش هیرو" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col p-4">
          <div className="flex flex-col gap-3">
            <h2>متن اصلی</h2>
            <input
              placeholder={hero.main_title}
              onChange={handleInputChange}
              name="main_title"
              className="w-full bg-white rounded-md shadow-sm p-3"
            />
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <h2>توضیحات</h2>
            <textarea
              placeholder={hero.description}
              onChange={handleInputChange}
              name="description"
              className="w-full bg-white rounded-md shadow-sm p-3"
            />
          </div>
          <div className="w-full flex gap-3">
            <div className="flex flex-col gap-3 mt-8">
              <h2>تصویر زمینه</h2>
              <input
                type="file"
                onChange={handleBackChange}
                name="bg_path"
                className="w-full bg-white rounded-md shadow-sm p-3"
              />
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <h2>تصویر لوگو</h2>
              <input
                type="file"
                onChange={handleLogoChange}
                name="logo_path"
                className="w-full bg-white rounded-md shadow-sm p-3"
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              disabled={sendLoading}
              className={`bg-amber-600 px-8 py-2 rounded-md text-white text-lg
                ${sendLoading ? 'cursor-not-allowed bg-amber-300' : ''}
                `}
            >
              ویرایش هیرو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
