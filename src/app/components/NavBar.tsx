"use client"

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

function NavBar() {
    const theme = "dark" // get theme from context
    const[isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const toggleMobileMenuOpen = () => {
     (!isMobileMenuOpen)
    }

    const menuItems = [
        {href: "/", lable :"Home"},
        {href: "/about", lable :"About"},
        {href: "/projects", lable :"Projects"},
        {href: "/blogs", lable :"Blogs"},
        {href: "/contact", lable :"Contact"},
    ]

  return (
    <nav className='fixed w-full bg-dark/80 backdrop-blur-sm z-50'>
        <div className='container max-w7x1 mx-auto px-4'>
            {/* desktop menu*/}
            <div className='flex items-center justify-between h-16'>
                <Link href="/" className='text-xl font-bold text-primary'>Devfolio&trade;</Link>
                
                {/* desktop menus */}
                <div className='hidden md:flex items-center space-x-8'>
                {
                    menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={`hover:text-primary transition-colors 
                            font-medium ${isActive ? ' text-primary' : ''}`}>
                                {item.lable}
                            </Link>
                        )
                    })
                }
                <button className='p-2 rounded-lg hover:bg-gray-100 text-primary dark:hover:bg-gray-800 
                transition-colors cursor-pointer'>
                    {
                        theme === "dark"  ? (
                            <SunIcon className='w-5 h-5'/>
                        ) : (
                        <MoonIcon className='w-5 h-5'/>
                        )
                    }
                </button>
                </div>
            </div>


            {/*mobile menu */}
        </div>
    </nav>
  )
}

export default NavBar