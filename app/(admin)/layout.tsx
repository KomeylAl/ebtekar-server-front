import { Metadata } from 'next';
import '../globals.css'
import Sidebar from './_components/SideBar';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "ابتکار صنعت - مدیریت",
  description: "ابتکار صنعت - مدیریت",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className='bg-gray-100'>
        <div>
          <Sidebar />
          <div className='lg:pr-80'>
            <Toaster />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
