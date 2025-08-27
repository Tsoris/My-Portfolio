import React from 'react'
import { FaCode } from 'react-icons/fa'

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

      {/*experience section*/}
      <section className='mb-16'>
        <h2 className='section-title'>Experience</h2>
        <div className='max-w-3xl mx-auto space-y-8'>
          <div className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'>
          <h3 className='text-xl font-semibold mb-2'>Software Developer Engineer</h3>
          <p className='text-primary mb-2'>Amazon • OCT 2022 - March 2024</p>
          <ul className='text-secondary space-y-2 list-disc list-inside'>
            <li>Engineered large systems to aggregate customer shopping data using ELT pipelines,enhancing decision-making for stakeholders and optimizing fund distribution</li>
            <li>Modified UI components with typescript, incorporating feedback from UI Design to improve user experience and functionality</li>
            <li>Modernized critical sections of legacy code, improving performance and maintainability by refactoring and implementing updated design patterns</li>
            <li>Managed and optimized AWS services including Lambda, S3, SQS, and VPC, improving system performance and cost-efficiency</li>
            <li>Implemented automated fail safes to enhance reliability and error transparency</li>
          </ul>
          </div>
        </div>
      </section>

      {/*education section*/}
      <section className='mb-16'>
        <h2 className='section-title'>Training & Education</h2>
        <div className='max-w-3xl mx-auto space-y-8'>
          <div className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'>
          <h3 className='text-xl font-semibold mb-2'>Bachelor of Science in Computer Science</h3>
          <p className='text-primary mb-2'>Oregon State University • Sep 2025 - Sep 2027</p>
          <p className='text-secondary'>Rigorous STEM Ciriculmn</p>
          </div>

          <div className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'>
          <h3 className='text-xl font-semibold mb-2'>Amazon Technical Acedemy</h3>
          <p className='text-primary mb-2'>Amazon • Feb 2022 - Oct 2022</p>
          <p className='text-secondary'>Rigorous in house program, designed to upskill employees to build software at Amazon</p>
          </div>

          <div className='bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md'>
          <h3 className='text-xl font-semibold mb-2'>Bachelor of Science in Health Sciences</h3>
          <p className='text-primary mb-2'>University of South Florida • Aug 2013 - May 2018</p>
          <p className='text-secondary'>Rigorous STEM Ciriculmn</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About