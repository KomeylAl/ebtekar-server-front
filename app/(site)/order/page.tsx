"use client";

import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Order = () => {
  const [name, setName]: any = useState("");
  const [phone, setPhone]: any = useState("");
  const [desc, setDesc]: any = useState("");

  const [loading, setLoading]: any = useState(false);
  const [error, setError]: any = useState("");

  const router = useRouter();

  const sendData = async () => {
    setLoading(true);
    if (!name || !phone || !desc) {
      setLoading(false);
      toast.error("لطفا همه فیلد ها را پر کنید");
    } else {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}orders/add`, {
          name,
          phone,
          description: desc,
        })
        .then(function (response) {
          if (response.status === 201) {
            setLoading(false);
            toast.success("سفارش شما با موفقیت ثبت شد");
            router.push("/");
          }
        })
        .catch(function (error) {
          setLoading(false);
          if (error.status === 500) {
            console.log('error')
            setLoading(false)
            router.refresh()
            toast.error('خطا در برقراری ارتباط با سرور')
          }
        })
        .finally(() => {
          setLoading(false)
        });
    }
  };

  return (
    <div className="py-8">
      <Header title="ثبت سفارش" />
      <div className="w-full p-8">
        <h2 className="text-2xl">ثبت سفارش</h2>
        <div className="w-full flex flex-col md:flex-row gap-3 mt-8">
          <div className="w-full">
            <label htmlFor="name">نام و نام خانوادگی</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              className="w-full p-4 bg-white shadow-sm rounded-md mt-4"
            />
          </div>
          <div className="w-full">
            <label htmlFor="phone">شماره تلفن</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              name="phone"
              className="w-full p-4 bg-white shadow-sm rounded-md mt-4"
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label htmlFor="">توضیحات سفارش</label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            name=""
            id=""
            className="w-full p-4 bg-white shadow-sm rounded-md mt-4"
          ></textarea>
        </div>
        <div>
          <button
            onClick={sendData}
            disabled={loading}
            className="px-8 py-4 bg-amber-500 text-white rounded-md text-xl mt-4"
          >
            ثبت سفارش
          </button>
        </div>
        <div className="mt-8">
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
