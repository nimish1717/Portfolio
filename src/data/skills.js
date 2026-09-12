export const SKILLS = [
  { name: 'React',          category: 'Frontend',  size: 'xl'  },
  { name: 'JavaScript',     category: 'Language',  size: 'xl'  },
  { name: 'C++',            category: 'Language',  size: 'lg'  },
  { name: 'Python',         category: 'Language',  size: 'lg'  },
  { name: 'Node.js',        category: 'Backend',   size: 'lg'  },
  { name: 'TypeScript',     category: 'Language',  size: 'md'  },
  { name: 'GSAP',           category: 'Animation', size: 'md'  },
  { name: 'Three.js',       category: 'Graphics',  size: 'md'  },
  { name: 'Framer Motion',  category: 'Animation', size: 'md'  },
  { name: 'SQL',            category: 'Database',  size: 'md'  },
  { name: 'MongoDB',        category: 'Database',  size: 'sm'  },
  { name: 'Tailwind CSS',   category: 'Frontend',  size: 'sm'  },
  { name: 'Express',        category: 'Backend',   size: 'sm'  },
  { name: 'PostgreSQL',     category: 'Database',  size: 'sm'  },
  { name: 'WebGL / GLSL',   category: 'Graphics',  size: 'sm'  },
  { name: 'Docker',         category: 'DevOps',    size: 'sm'  },
  { name: 'Git',            category: 'DevOps',    size: 'sm'  },
];

export const SKILL_SIZE_MAP = {
  xl:  { fontSize: 'clamp(2rem, 5vw, 4rem)',      fontWeight: 800 },
  lg:  { fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', fontWeight: 700 },
  md:  { fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',   fontWeight: 600 },
  sm:  { fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)', fontWeight: 500 },
};
