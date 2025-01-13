import { mainPageAbout } from "@/actions/main-page-data";
import AboutComp from "@/components/AboutComp";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره و تماس با ما - ابتکار صنعت اسپادانا",
  description:
    "شرکت ماشین سازی ابتکار صنعت اسپادانا با سال‌ها تجربه در طراحی و ساخت ماشین‌آلات صنعتی، به عنوان یکی از پیشگامان این حوزه در ایران شناخته می‌شود. این شرکت با تکیه بر دانش فنی متخصصان داخلی و بهره‌گیری از فناوری‌های روز دنیا، محصولات متنوع و باکیفیتی را برای صنایع مختلف ارائه می‌دهد.",
};

export default async function About() {
  
  const info = await mainPageAbout();

  return (
    <div className="py-8">
      <Header title="درباره و تماس با ما" />
      <AboutComp
        name={info.company_name}
        description={info.description}
        phone={info.phone_numbers}
        address={info.address}
        email={info.email}
        logo={info.logo_path}
      />
    </div>
  );
};
