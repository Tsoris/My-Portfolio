import {
  FaCloud,
  FaCode,
  FaDatabase,
  FaLaptopCode,
  FaProjectDiagram,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import Timeline from '../components/aboutpage/Timeline';

interface SkillGroup {
  title: string;
  icon: IconType;
  skills: readonly string[];
}

const skillGroups = [
  {
    title: 'Languages',
    icon: FaCode,
    skills: ['Java', 'TypeScript / JavaScript', 'Python', 'SQL'],
  },
  {
    title: 'Frontend',
    icon: FaLaptopCode,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML5 / CSS3'],
  },
  {
    title: 'Backend & Data',
    icon: FaDatabase,
    skills: [
      'Spring Boot',
      'Node.js / Express.js',
      'REST APIs',
      'PostgreSQL',
      'MongoDB',
      'Prisma / Mongoose',
    ],
  },
  {
    title: 'Cloud & Developer Tools',
    icon: FaCloud,
    skills: [
      'AWS Lambda / SQS / S3',
      'AWS CloudWatch / Alarms',
      'Linux / SSH',
      'Docker',
      'Git / GitHub',
      'CI/CD',
    ],
  },
  {
    title: 'Architecture & Quality',
    icon: FaProjectDiagram,
    skills: [
      'MVC / Layered Architecture',
      'Distributed Systems',
      'Object-Oriented Design',
      'Unit & Integration Testing',
      'Observability / Monitoring',
    ],
  },
] satisfies readonly SkillGroup[];

const skillGroupClassName =
  'group relative border-b border-gray-200 px-6 py-6 transition-[transform,background-color,box-shadow] duration-300 ease-out last:border-b-0 hover:z-10 hover:-translate-y-1 hover:scale-[1.025] hover:bg-primary/5 hover:shadow-xl dark:border-gray-700 lg:border-r lg:border-b-0 lg:last:border-r-0 motion-reduce:transform-none motion-reduce:transition-none';

const skillPillClassName =
  'rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-gray-800 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-md dark:text-gray-200 motion-reduce:transform-none motion-reduce:transition-none';

function About() {
  return (
    <div className='container mx-auto max-w-7xl py-20'>
      <h1 className='mb-8 text-center text-4xl font-bold'>About Me</h1>

      {/* bio section */}
      <section className='mb-16'>
        <div className='mx-auto max-w-3xl space-y-4 text-center text-lg leading-relaxed text-gray-800 dark:text-gray-200'>
          <p>
            I&apos;m a software engineer who enjoys turning complex problems
            into reliable, useful software. My path into technology has taken me
            from health sciences to Amazon Technical Academy and Amazon Ads.
          </p>
          <p>
            Today, I&apos;m studying computer science at Oregon State while
            helping other students build confidence in discrete mathematics.
            Whether I&apos;m designing a distributed service or building a chess
            application, I&apos;m most engaged by understanding how the pieces
            fit together and turning ideas into things that work.
          </p>
        </div>
      </section>

      {/* skills section */}
      <section className='mb-16'>
        <h2 className='section-title'>Skills</h2>
        <div className='grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-dark/50 lg:grid-cols-5'>
          {skillGroups.map((group) => {
            const Icon = group.icon;

            return (
              <div key={group.title} className={skillGroupClassName}>
                <div className='mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none'>
                  <Icon className='h-5 w-5' aria-hidden='true' />
                </div>
                <h3 className='mb-4 text-lg font-semibold text-primary'>
                  {group.title}
                </h3>
                <ul
                  className='flex flex-col items-start gap-2'
                  aria-label={group.title}
                >
                  {group.skills.map((skill) => (
                    <li key={skill} className={skillPillClassName}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      <Timeline />
    </div>
  );
}

export default About;
