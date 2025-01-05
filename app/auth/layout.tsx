import { Metadata } from 'next';
import '../globals.css'

export const metadata: Metadata = {
  title: "ابتکار صنعت - ورود",
  description: "ابتکار صنعت - ورود",
};

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className='bg-gray-100'>
          <div className='min-h-screen'>
            <div className="-z-10 top-20 fixed right-20 bg-orange-500 filter blur-[120px] w-12 lg:w-64 h-64" />
            <div className="-z-10 top-80 fixed right-80 bg-blue-500 filter blur-[120px] w-12 lg:w-64 h-64" />
            {children}
          </div>
        </body>
      </html>
    );
  }
  