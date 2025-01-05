"use client";

import React, { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { CgMenuRightAlt } from "react-icons/cg";
import axios from "axios";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
import NavBar from "./NavBar";

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const date = new Date().toLocaleDateString("fa-IR");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const userToken = getCookie("token");
  const router = useRouter();

  const handleLogOut = async () => {
    setIsLoading(true)
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/logout`, {}, {
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${userToken}`
        }
      });
      if (response.status === 200) {
        deleteCookie('token');
        router.push('/login');
      }
    } catch (e: any) {
      setIsLoading(false)
      console.log(e.toString())
    }
  }

  return (
    <>
      <div className={`${isOpen ? 'bg-black bg-opacity-80' : ''} w-full h-full`}>
        <div className={`${isOpen ? 'flex' : 'hidden'} w-fit h-fit rounded-md p-8 bg-amber-600 absolute z-10 top-20 right-6 transition-all duration-150`}>
          <NavBar />
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white w-full h-32 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CgMenuRightAlt
            onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}
            size={25} className="lg:hidden" />
          <h2 className="font-semibold text-xl">{pageTitle}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className={`${isLoading ? 'text-rose-300' : 'text-rose-500'} cursor-pointer`} onClick={handleLogOut}>
          <BiLogOut className="" size={20} />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <IoMdPerson className="text-gray-400" size={20} />
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200/40" />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm text-gray-500">
          ماشین سازی ابتکار صنعت
        </p>
        <p>{date}</p>
      </div>
    </div>
    </>
  );
};

export default Header;
