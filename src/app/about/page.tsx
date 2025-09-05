import React from 'react'
import { FaCode } from 'react-icons/fa'
import Timeline from '../components/aboutpage/Timeline'
import Link from 'next/link'
import { FaClipboard } from 'react-icons/fa6'

function About() {
  return (
    <div className='container max-w-7xl mx-auto py-20'>
      <h1 className='text-4xl front-bold mb-8 text-center'>About Me</h1>

      {/* bio section */}
      <section className='mb-16'>
        <p className='text-lg text-secondary max-w-3xl mx-auto text-center'>
          I'm a passionate Full Stack Developer with expertise in building modern web applications. With a strong foundation in both frontend and backend technologies, I create seamless user experiences and robust server-side solutions.
        </p>
      </section>

      {/* skills section */}
      <section className='mb-16'>
        <h2 className='section-title'>Skills</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'>
            <FaCode className='h-8 w-8 text-primary mb-4'/>
            <h3 className='text-xl font-semibold mb-2'>Frontend</h3>
            <ul className='text-secondary space-y-2'>
              <li>react / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>HTML5 / CSS3</li>
            </ul>
          </div>
          <div className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'>
            <FaCode className='h-8 w-8 text-primary mb-4'/>
            <h3 className='text-xl font-semibold mb-2'>BackEnd</h3>
            <ul className='text-secondary space-y-2'>
              <li>Node.js</li>
              <li>Express</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
            </ul>
          </div>
          <div className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'>
            <FaCode className='h-8 w-8 text-primary mb-4'/>
            <h3 className='text-xl font-semibold mb-2'>Tools & Others</h3>
            <ul className='text-secondary space-y-2'>
              <li>Git / GitHub</li>
              <li>Docker</li>
              <li>AWS</li>
              <li>CI/CD</li>
            </ul>
          </div>
        </div>
      </section>
      <Timeline/>
    </div>
    
  )
}

export default About