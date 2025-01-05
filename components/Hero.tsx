import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import Image from "next/image";
import back from '@/app/images/hero.jpg'
import Link from "next/link";

interface HeroProps {
  data: any
}

const Hero = ({ data }: HeroProps) => {
  return (
    <div className="w-full relative h-[600px] rounded-xl lg:rounded-bl-[200px] shadow-xl">
      <Image 
        src={data.bg_path || back}
        alt="background"
        width={1200}
        height={500}
        className="w-full absolute -z-20 object-cover h-[600px] rounded-xl rounded-bl-[200px]"
      />
      <div className="w-full h-full bg-black bg-opacity-80 rounded-xl lg:rounded-bl-[200px]">
        <div className="w-full h-full px-16 py-8 flex flex-col items-center justify-start">
          <div className="w-full flex items-center justify-between">
            <Logo image={data.logo_path} />
            <Nav />
          </div>
          <div className="flex flex-col w-full h-full items-center justify-center gap-4">
            <h1 className="text-3xl text-white font-bold text-center">
              {!data.main_title ? 'ماشین سازی ابتکار صنعت' : data.main_title}
            </h1>
            <p className="text-white text-center mt-4">
              {!data.description ? 'ماشین سازی ابتکار صنعت' : data.description}
            </p>
            <Link href='/products' className="px-8 py-1 mt-4 bg-amber-600 rounded-lg text-white text-lg">
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
