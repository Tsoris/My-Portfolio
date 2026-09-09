import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'drop-in-chess',
    title: 'Drop In Chess',
    projectType: 'CHESS GAME PLATFORM',
    visualTheme: 'chess',
    description:
      'Jump into curated chess positions and play them out, backed by server-side move validation and game state management.',
    technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'REST APIs'],
    githubLink: 'https://github.com/Tsoris/drop-in-chess/blob/main/README.md',
    demoComingSoonLink:
      'https://github.com/Tsoris/drop-in-chess/blob/main/docs/Drop-in-Chess-Design-Document-V1.md#15-development-milestones',
  },
  {
    id: 'animal-game',
    title: 'AnimalGame',
    projectType: 'OBJECT-ORIENTED GAME ENGINE',
    visualTheme: 'animal-game',
    description:
      'A Python strategy-game engine featuring polymorphic pieces, movement validation, captures, turn management, and win-state detection.',
    technologies: [
      'Python',
      'Object-Oriented Design',
      'Unit Testing',
      'Game Logic',
    ],
    sourcePrivate: true,
    demoLink: '/projects/animal-game',
    demoLabel: 'Play Demo',
  },
  {
    id: 'temperature-data-parser',
    title: 'Temperature Data Parser',
    projectType: 'SYSTEMS PROGRAMMING COURSEWORK',
    visualTheme: 'assembly',
    description:
      'An x86 assembly utility that reads 24 signed temperatures from a comma-delimited ASCII file, converts them manually, and restores their chronological order.',
    technologies: ['x86 Assembly', 'MASM', 'Irvine32', 'File I/O'],
    sourcePrivate: true,
    demoLink: '/projects/temperature-data-parser',
    demoLabel: 'Explore Project',
  },
  {
    id: 'hash-map-collision-strategies',
    title: 'HashMap Collision Strategies',
    projectType: 'DATA STRUCTURES COURSEWORK',
    visualTheme: 'hash-map',
    description:
      'Two Python hash-map implementations comparing quadratic probing with tombstones against separate chaining with linked-list buckets.',
    technologies: [
      'Python',
      'Hash Tables',
      'Quadratic Probing',
      'Separate Chaining',
    ],
    sourcePrivate: true,
    demoLink: '/projects/hash-map-collision-strategies',
    demoLabel: 'Explore Demo',
  },
  {
    id: 'mern-exercise-tracker',
    title: 'MERN Exercise Tracker',
    projectType: 'FULL-STACK CRUD APPLICATION',
    visualTheme: 'exercise-tracker',
    description:
      'A deployed full-stack exercise tracker with a React interface, Express REST API, and MongoDB persistence for creating, editing, and deleting workout records.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Mongoose'],
    githubLink: 'https://github.com/Tsoris/MERNExerciseTracker',
    demoLink: 'https://mern-exercise-tracker-j6jb.onrender.com/',
    demoLabel: 'Live Demo',
    demoNote: 'Free demo hosting may take up to a minute to wake.',
  },
  {
    id: 'devfolio',
    title: "Tim's Devfolio",
    projectType: 'Full-Stack Developer Portfolio',
    description:
      'A responsive full-stack portfolio featuring animated interfaces, persistent theming, and a validated contact workflow backed by PostgreSQL and transactional email.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'Resend',
      'Framer Motion',
    ],
    githubLink: 'https://github.com/Tsoris/My-Portfolio/blob/main/README.md',
    demoLink: 'https://tims-devfolio.vercel.app/',
  },
];
