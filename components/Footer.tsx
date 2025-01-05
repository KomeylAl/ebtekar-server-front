import React from "react";
import logo from '@/app/images/logo.png'
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import Image from "next/image";
import back from '@/app/images/hero.jpg'
import { footerData } from "@/actions/footer-data";

export default async function Footer() {

  const data = await footerData()

  return (
    <div className="flex flex-col gap-3 pb-16 lg:pb-0">
      <div className="relative w-full rounded-xl lg:rounded-tr-[200px] shadow-xl">
      <Image 
        src={data.bg_path || back}
        alt="background"
        width={1200}
        height={800}
        className="w-full absolute -z-20 object-cover h-full rounded-xl rounded-tr-[200px]"
      />
        <div className="w-full h-full bg-black bg-opacity-80 rounded-xl lg:rounded-tr-[200px]">
          <div className="p-8 lg:py-12 lg:px-32 flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col items-start gap-4 w-full lg:max-w-[80%] text-white">
              <h2 className="text-2xl">{data.company_name}</h2>
              <p className="text-justify">
                {data.description}
              </p>
              <div className="flex items-center gap-2 text-white">
                  <BiMap size={30} />
                  <p>{data.address}</p>
              </div>
              <div className="flex items-center gap-2 text-white">
                  <BiPhone size={30} />
                  <p>{data.phone_numbers}</p>
              </div>
              <div className="flex items-center gap-2 text-white">
                  <BiEnvelope size={30} />
                  <p>{data.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
               <Image
                  src={data.logo_path || logo}
                  alt=""
                  className="w-[400px]"
               />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center w-full py-6">
        <p>
          تمامی حقوق مادی و معنوی برای ابتکار صنعت محفوظ است. طراحی وب سایت
          ابتکار صنعت - آژانس خلاقیت میقات
        </p>
      </div>
    </div>
  );
};
