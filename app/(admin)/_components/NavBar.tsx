'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { BiComment, BiDownvote, BiInfoCircle, BiListPlus, BiUpload } from 'react-icons/bi';
import { FiList } from 'react-icons/fi';
import { GrProductHunt } from 'react-icons/gr';
import { MdDashboard } from 'react-icons/md';

  const links = [
    {
      title: "داشبورد",
      link: "/dashboard",
      access: "admin",
      icon: <MdDashboard />,
    },
    {
      title: "محصولات",
      link: "/dashboard/products",
      access: "admin",
      icon: <GrProductHunt />,
    },
    {
      title: "مقالات",
      link: "/dashboard/posts",
      access: "admin",
      icon: <FiList />,
    },
    {
      title: "اطلاعات شرکت",
      link: "/dashboard/info",
      access: "admin",
      icon: <BiInfoCircle />,
    },
    {
      title: "سفارشات",
      link: "/dashboard/orders",
      access: "admin",
      icon: <BiListPlus />,
    },
    {
      title: "نظرات مشتریان",
      link: "/dashboard/comments",
      access: "admin",
      icon: <BiComment />,
    },
    {
      title: "بخش هیرو",
      link: "/dashboard/hero",
      access: "admin",
      icon: <BiUpload />,
    },
    {
      title: "فوتر سایت",
      link: "/dashboard/footer",
      access: "admin",
      icon: <BiDownvote />,
    },
    {
      title: "مدیران سایت",
      link: "/admin/admins",
      access: "boss",
      icon: <FiList />,
    },
  ];

const NavBar = () => {

  const pathName = usePathname();
  
  return (
    <div className="flex flex-col gap-4 w-full">
      {links.map((link) => {
          return link.access === "admin" ? (
            <Link
              key={link.link}
              href={link.link}
              className={`text-white flex items-center 
                            gap-2 text-lg w-full px-4 py-2
                            ${
                              pathName === link.link
                                ? "bg-amber-900 rounded-md"
                                : "bg-transparent"
                            }
                            `}
            >
              {link.icon} {link.title}
            </Link>
          ) : (
            <div key={link.link}></div>
          );
      })}
    </div>
  )
}

export default NavBar