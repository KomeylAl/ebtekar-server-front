"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { MdArticle } from "react-icons/md";
import { TbHexagonPlusFilled } from "react-icons/tb";
import MobileNavLink from "./MobileNavLink";

const routes = [
  {
    path: "/",
    title: "",
    icon: <GoHomeFill size={25} />,
  },
  {
    path: "/products",
    title: "",
    icon: <FaBagShopping size={25} />,
  },
  {
    path: "/posts",
    title: "",
    icon: <MdArticle size={25} />,
  },
  {
    path: "/order",
    title: "",
    icon: <TbHexagonPlusFilled size={25} />,
  },
  {
    path: "/about",
    title: "",
    icon: <FaInfoCircle size={25} />,
  },
];

const SideBar = () => {
  const pathName = usePathname();

  return (
    <div className="hidden lg:block w-16 h-screen fixed py-8">
      <div className="flex flex-col items-center justify-center h-full gap-20 bg-white rounded-xl shadow-xl">
        {routes.map((route: any) => (
          <MobileNavLink
            href={route.path}
            key={route.path}
            icon={route.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
