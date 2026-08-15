import SkillCard from '../components/aboutpage/SkillCard';
import Timeline from '../components/aboutpage/Timeline';

const skillGroups = [
  {
    title: 'Frontend',
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git / GitHub', 'Docker', 'AWS', 'CI/CD'],
  },
];

function About() {
  return (
    <div className='container max-w-7xl mx-auto py-20'>
      <h1 className='text-4xl front-bold mb-8 text-center'>About Me</h1>

      {/* bio section */}
      <section className='mb-16'>
        <p className='text-lg text-secondary max-w-3xl mx-auto text-center'>
          I&apos;m a passionate Full Stack Developer with expertise in building
          modern web applications. With a strong foundation in both frontend and
          backend technologies, I create seamless user experiences and robust
          server-side solutions.
        </p>
      </section>

      {/* skills section */}
      <section className='mb-16'>
        <h2 className='section-title'>Skills</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {skillGroups.map((group) => (
            <SkillCard
              key={group.title}
              title={group.title}
              skills={group.skills}
            />
          ))}
        </div>
      </section>
      <Timeline />
    </div>
  );
}

export default About;
