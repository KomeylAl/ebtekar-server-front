'use client';

import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    try{
      setIsLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/login`, {
        'phone' : phone,
        'password' : password,
        headers : {
          'Accept' : 'application/json',
          'Content-type' : 'application/json'
        }
      });
      if (response.status === 200) {
        setCookie('token', response.data.access_token, { maxAge: 7200 });
        router.push('/');
        setIsLoading(false);
      } 
      console.log(response.status)
      if (response.status === 401) {
        setIsLoading(false);
        setError('نام کاربری یا رمز عبور اشتباه است');
        console.log('error');
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      setIsLoading(false);
      setError(e.response.data.error);
      console.log(e.toString());
    }
  }

  return (
    <div className="w-dvw h-dvh flex justify-center items-center ">
      <div className="flex flex-col gap-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-sky-600 text-center">
          ابتکار صنعت - ورود
        </h1>
        <div className="md:w-[600px] h-fit bg-white shadow-md rounded-md p-10 flex flex-col justify-between items-start">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full">
              <label>شماره تلفن</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="w-full bg-white border border-sky-300 py-2 rounded-md shadow-sm px-2 mt-4"
              />
            </div>
            <div className="w-full">
              <label>رمز عبور</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                className="w-full bg-white border border-sky-300 py-2 rounded-md shadow-sm px-2 mt-4"
              />
            </div>
          </div>
          <div className='h-16 mt-3'>
            <p className='text-rose-600'>
            {error}
            </p>
          </div>
          <div
          onClick={handleSubmit}
            className={
              `w-44 p-2 rounded-md text-center text-white
               ${isLoading ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-600 cursor-pointer'}
              `
            }>
            ورود
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
