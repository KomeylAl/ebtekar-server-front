import Image from "next/image";
import React from "react";
import logo from "@/app/images/logo.png";

interface AboutProps{
  data: any
}

const About = ({ data }: AboutProps) => {
  return (
    <div
      className="
      w-full flex flex-col lg:flex-row justify-between
      p-8 lg:py-8 lg:px-32 mt-32 bg-black gap-20
      bg-opacity-90 rounded-xl shadow-xl text-white"
    >
      <div className="w-full mt-8 flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{data.company_name}</h2>
        <p className="text-justify">
          {data.description}
        </p>
      </div>
      <Image src={data.logo_path || logo} alt="logo" width={250} height={250} className="" />
    </div>
  );
};

export default About;
