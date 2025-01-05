import React from "react";
import Header from "../../_components/Header";

const Footer = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="ویرایش فوتر" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col p-4">
          <div className="w-full flex gap-3">
            <div className="w-full flex flex-col gap-3">
              <h2>آدرس</h2>
              <input className="w-full bg-white rounded-md shadow-sm p-3" />
            </div>
            <div className="w-full flex flex-col gap-3">
              <h2>ایمیل</h2>
              <input className="w-full bg-white rounded-md shadow-sm p-3" />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <h2>شماره های تماس</h2>
            <textarea className="w-full bg-white rounded-md shadow-sm p-3" />
          </div>
          <div className="w-full flex gap-3">
            <div className="flex flex-col gap-3 mt-8">
              <h2>تصویر زمینه</h2>
              <input
                type="file"
                className="w-full bg-white rounded-md shadow-sm p-3"
              />
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <h2>تصویر لوگو</h2>
              <input
                type="file"
                className="w-full bg-white rounded-md shadow-sm p-3"
              />
            </div>
          </div>
          <div className="mt-8">
            <button className="bg-amber-600 px-8 py-2 rounded-md text-white text-lg">
              ویرایش فوتر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
