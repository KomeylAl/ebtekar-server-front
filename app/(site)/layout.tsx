import type { Metadata } from "next";
import "../globals.css";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { Toaster } from "react-hot-toast";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const siteTitle = "ابتکار صنعت اسپادانا";
  const pageTitle = params.slug ? `${params.slug} - ${siteTitle}` : siteTitle;
  return {
    title: pageTitle,
    description:
      "شرکت ماشین سازی ابتکار صنعت اسپادانا با سال‌ها تجربه در طراحی و ساخت ماشین‌آلات صنعتی...",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 lg:pl-12 px-8 relative">
          <div className="h-full">
          <div className="-z-10 top-20 fixed right-20 bg-orange-500 filter blur-[120px] w-12 lg:w-64 h-64" />
          <div className="-z-10 top-80 fixed right-80 bg-blue-500 filter blur-[120px] w-12 lg:w-64 h-64" />
          <SideBar />
          <MobileNav />
          <div className="lg:pr-24">
            <Toaster />
              {children}
            <Footer />
          </div>
          </div>
      </body>
    </html>
  );
}