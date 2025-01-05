import Image from "next/image";
import React from "react";
import f1 from "@/app/images/f-1.png";
import f2 from "@/app/images/f-2.png";
import f3 from "@/app/images/f-3.png";
import f4 from "@/app/images/f-4.png";

const Features = () => {
  return (
    <div className="w-full h-fit mt-10 md:-mt-20 flex flex-col md:flex-row items-center gap-10 px-8 z-10">
      <div className="w-48 h-48 bg-white rounded-lg flex flex-col items-center justify-center gap-2">
        <Image src={f4} alt="" width={100} height={100} />
        <p className="text-lg">تضمین کیفیت</p>
      </div>
      <div className="w-48 h-48 bg-white rounded-lg flex flex-col items-center justify-center gap-2">
        <Image src={f3} alt="" width={100} height={100} />
        <p className="text-lg">سرعت</p>
      </div>
      <div className="w-48 h-48 bg-white rounded-lg flex flex-col items-center justify-center gap-2">
        <Image src={f2} alt="" width={100} height={100} />
        <p className="text-lg">ارسال به سراسر کشور</p>
      </div>
      <div className="w-48 h-48 bg-white rounded-lg flex flex-col items-center justify-center gap-2">
        <Image src={f1} alt="" width={100} height={100} />
        <p className="text-lg">تنوع محصولات</p>
      </div>
    </div>
  );
};

export default Features;
