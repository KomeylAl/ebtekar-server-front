import React from 'react'
import Logo from './Logo'
import Nav from './Nav'

interface HeaderProps {
   title: string,
}

const Header = ({ title }: HeaderProps) => {
  return (
   <div className="w-full hero h-[300px] rounded-xl md:rounded-bl-[200px] shadow-xl">
   <div className="w-full h-full bg-black bg-opacity-80 rounded-xl md:rounded-bl-[200px]">
     <div className="w-full h-full px-16 py-8 flex flex-col items-center justify-start">
       <div className="w-full flex items-center justify-between">
         <Logo image='' />
         <Nav />
       </div>
       <div className="flex flex-col w-full h-full items-center justify-center gap-4">
         <h1 className="text-3xl text-white font-bold text-right">
           {title}
         </h1>
       </div>
     </div>
   </div>
 </div>
  )
}

export default Header