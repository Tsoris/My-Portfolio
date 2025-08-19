import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className='bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-800'>
        <div className='container max-w-7xl mx-auto px-4 py-8'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='mb-4 md:mb-0'>
                    <Link href="/" className='text-xl font-bold text-primary'>Devfolio&trade;</Link>
                    <p className='text-sm text-secondary mt-2'>{new Date().getFullYear()} Devfolio. ALl rights reserved.</p>
                </div>

                <div>
                    <div className='flex justify-center space-x-4 mb-8'>
                        <Link href="/" className='text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300'>
                        <FaGithub/>
                        </Link>
                        <Link href="/" className='text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300'>
                        <FaLinkedin/>
                        </Link>
                        <Link href="/" className='text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300'>
                        <FaTwitter/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
