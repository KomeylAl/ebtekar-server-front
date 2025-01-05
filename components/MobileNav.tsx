'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { MdArticle } from "react-icons/md";
import { TbHexagonPlusFilled } from "react-icons/tb";
import TransitionLink from "./TransitionLink";
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

const MobileNav = () => {
  const pathName = usePathname();
  return (
      <div className="flex items-center justify-center">
         <div className=" z-20
         lg:hidden fixed py-4 flex items-center bottom-4 w-[90%]
         justify-center gap-12 md:gap-20 bg-white rounded-xl shadow-xl">
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

export default MobileNav;
