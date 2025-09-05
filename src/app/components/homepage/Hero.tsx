import Image from'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFileAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

function Hero() {
  return (
    <section className='py-28 containar max-w-7xl mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
            <div className='flex flex-col items-center mb-4'>
            <Image src="/profile.png" alt='profile image' width={100} height={100} className='
            rounded-full mb-4 w-32 h-32 object-cover object-[center_20%] p-1 ring-2 ring-primary'/>
            </div>

            <h1 className='text-4xl md:text-6xl front-bold mb-6'>Hi, I'm <span className='text-primary'>Timothy Sorisa
                </span></h1>
            
            <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8'>
                Full Stack Developer
            </p>

            {/* todo need to link to actual web pages */}
            
            <div className='flex justify-center space-x-4 mb-8'>
                <Link 
                href="https://github.com/Tsoris" 
                target='_blank'
                rel="noopener noreferrer"
                className='text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300'>
                    <FaGithub/>
                </Link>
                <Link 
                href="https://www.linkedin.com/in/timothy-sorisa-9b650580/" 
                target='_blank'
                rel="noopener noreferrer"
                className='text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300'>
                    <FaLinkedin/>
                </Link>
                <Link 
                href="https://x.com/TimSorDevelop" 
                target='_blank'
                rel="noopener noreferrer"
                className='text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300'>
                    <FaTwitter/>
                </Link>
                <Link 
                href="../projects/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300">
                    <FaFileAlt />
                    <span className="tooltip tooltip-show">
                    View Resume
                    </span>
                </Link>
            </div>

            <div className='flex flex-col md:flex-row justify-center gap-4'>
                <Link href="/projects" className='bg-primary inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition-colors'>
                Veiw Projects
                </Link>

                <Link href="/contact" className='bg-gray-500 inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg hover:text-gray-800 hover:bg-gray-300 transition-colors'>
                Contact Me
                </Link>
            </div>

        </div>
    </section>
  )
}

export default Hero