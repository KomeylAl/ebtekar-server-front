'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiHome } from 'react-icons/bi'
import TransitionLink from './TransitionLink'


const navItems = [
    {
        'name' : 'خانه',
        'url' : '/',
        'icon' : <BiHome />
    },
    {
        'name' : 'محصولات',
        'url' : '/products',
        'icon' : <BiHome />
    },
    {
        'name' : 'وبلاگ',
        'url' : '/posts',
        'icon' : <BiHome />
    },
    {
        'name' : 'ثبت سفارش',
        'url' : '/order',
        'icon' : <BiHome />
    },
    {
        'name' : 'درباره و تماس با ما',
        'url' : '/about',
        'icon' : <BiHome />
    },
]

const Nav = () => {

  const pathName = usePathname()

  return (
    <div className='hidden lg:flex items-center gap-16'>
        {navItems.map((item) => (
            <TransitionLink key={item.url} href={item.url} label={item.name}/>
        ))}
    </div>
  )
}

export default Nav