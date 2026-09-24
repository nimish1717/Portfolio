import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const SKILL_DATA = {
  FRONTEND: {
    label: 'Frontend',
    color: '#46B7FF', // Pale blue
    items: [
      { name: 'React', desc: 'Interactive frontend interfaces' },
      { name: 'TypeScript', desc: 'Type-safe JavaScript' },
      { name: 'JavaScript', desc: 'Core web logic' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling' },
      { name: 'Framer Motion', desc: 'React animations' },
      { name: 'GSAP', desc: 'Complex web animations' },
      { name: 'Three.js', desc: '3D web experiences' },
      { name: 'HTML', desc: 'Semantic structure' },
      { name: 'CSS', desc: 'Advanced styling' },
    ],
    combinations: [
      { stack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'], label: 'MODERN UI DEVELOPMENT' }
    ]
  },
  BACKEND: {
    label: 'Backend',
    color: '#4ADE80', // Mint green
    items: [
      { name: 'Node.js', desc: 'Backend systems & APIs' },
      { name: 'Express', desc: 'Web framework for Node' },
      { name: 'MongoDB', desc: 'NoSQL database' },
      { name: 'PostgreSQL', desc: 'Structured relational data' },
      { name: 'Prisma', desc: 'Next-generation ORM' },
      { name: 'REST APIs', desc: 'Standardized communication' },
      { name: 'JWT', desc: 'Secure authentication' },
      { name: 'Redis', desc: 'In-memory caching' },
    ],
    combinations: [
      { stack: ['Node.js', 'Express', 'PostgreSQL', 'Prisma'], label: 'SCALABLE RELATIONAL API' }
    ]
  },
  LANGUAGES: {
    label: 'Languages',
    color: '#FBBF24', // Warm amber
    items: [
      { name: 'C++', desc: 'High-performance computing' },
      { name: 'Python', desc: 'Machine learning & scripts' },
      { name: 'JavaScript', desc: 'Full-stack development' },
      { name: 'TypeScript', desc: 'Robust applications' },
      { name: 'SQL', desc: 'Data querying & management' },
    ],
    combinations: [
      { stack: ['Python', 'PostgreSQL', 'Docker', 'Linux'], label: 'DATA ENGINEERING' }
    ]
  },
  TOOLS: {
    label: 'Tools & Platforms',
    color: '#A78BFA', // Soft purple
    items: [
      { name: 'Git', desc: 'Version control' },
      { name: 'GitHub', desc: 'Code collaboration' },
      { name: 'Docker', desc: 'Containerization' },
      { name: 'VS Code', desc: 'Primary IDE' },
      { name: 'Postman', desc: 'API testing' },
      { name: 'Vercel', desc: 'Frontend deployment' },
      { name: 'Render', desc: 'Backend deployment' },
      { name: 'Linux', desc: 'Server environments' },
    ],
    combinations: [
      { stack: ['GitHub', 'Docker', 'Vercel', 'Render'], label: 'CI/CD & DEPLOYMENT' }
    ]
  },
  CREATIVE: {
    label: 'Design & Creative',
    color: '#F472B6', // Pink
    items: [
      { name: 'Figma', desc: 'Interface before implementation' },
      { name: 'Photoshop', desc: 'Asset manipulation' },
      { name: 'After Effects', desc: 'Motion prototyping' },
      { name: 'Blender', desc: '3D modeling' },
      { name: 'UI/UX', desc: 'User-centered design' },
      { name: 'Motion Design', desc: 'Interactive feel' },
    ],
    combinations: [
      { stack: ['Figma', 'React', 'Framer Motion', 'GSAP'], label: 'DESIGN TO CODE' }
    ]
  }
};

const ORBIT_POSITIONS = {
  FRONTEND: { x: '50%', y: '15%', radius: 250 },
  BACKEND: { x: '15%', y: '45%', radius: 300 },
  LANGUAGES: { x: '35%', y: '80%', radius: 200 },
  TOOLS: { x: '85%', y: '40%', radius: 350 },
  CREATIVE: { x: '75%', y: '80%', radius: 280 }
};

export default function Skills() {
  const sectionRef = useRef(null);
  const orbitSystemRef = useRef(null);
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMobile) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Entry Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true
        }
      });

      tl.from('.skills-header > *', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.orbit-core', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.5)'
      }, '-=0.4')
      .from('.orbit-path', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.6')
      .from('.orbit-node', {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(2)'
      }, '-=0.8')
      .from('.skills-index', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentCombination = hoveredSkill 
    ? SKILL_DATA[activeCategory || Object.keys(SKILL_DATA).find(cat => SKILL_DATA[cat].items.some(i => i.name === hoveredSkill))]?.combinations[0]
    : SKILL_DATA[activeCategory || 'FRONTEND']?.combinations[0];

  const handleCategoryHover = (catKey) => {
    setActiveCategory(catKey);
    setHoveredSkill(null);
  };

  const handleSkillHover = (skillName, catKey) => {
    setActiveCategory(catKey);
    setHoveredSkill(skillName);
  };

  const activeSkillObj = activeCategory && hoveredSkill 
    ? SKILL_DATA[activeCategory].items.find(i => i.name === hoveredSkill)
    : null;

  return (
    <section ref={sectionRef} id="skills" className="skills-section">
      
      {/* 1. Header (Top Left) */}
      <div className="skills-header relative z-20">
        <div className="skills-label">03 / SKILLS</div>
        <h2 className="skills-huge-title">
          <span className="text-[var(--bone)] block">THE TECH STACK</span>
          <span className="text-[var(--tide)] block">I BUILD WITH.</span>
        </h2>
        <p className="skills-desc">
          A mix of technologies, tools and creative software I use to design, develop and ship products.
        </p>
        
        {/* Little handwritten annotation */}
        <div className="skills-annotation hidden md:block">
          Same tools.<br/>
          Different<br/>
          possibilities.
        </div>
      </div>

      {/* 2. Right Side Combiner Visualizer (Desktop) */}
      {!isMobile && (
        <div className="skills-combiner z-30">
          
          {/* Active Skill Focus Panel */}
          <div className="skills-focus-panel">
            <div className="flex justify-between items-center mb-4">
              <div className="text-[10px] font-mono tracking-widest text-[var(--tide)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--tide)]"></span> SELECT A SKILL
              </div>
              <div className="text-[10px] font-mono text-[var(--dim)]">01 / 05</div>
            </div>
            
            <div className="flex items-start gap-4 mb-6 min-h-[60px]">
              <div className="text-3xl font-bold text-white tracking-wide">
                {activeSkillObj ? activeSkillObj.name : 'Hover a technology'}
              </div>
            </div>
            <p className="text-sm text-[var(--mist)] leading-relaxed min-h-[40px]">
              {activeSkillObj ? activeSkillObj.desc : 'Explore the orbital system or the index below to see the specific tools I use.'}
            </p>
          </div>

          {/* Stack Combinations Panel */}
          <div className="skills-stack-panel mt-6">
            <div className="text-[10px] font-mono tracking-widest text-[var(--dim)] mb-6 flex justify-between">
              HOW I COMBINE THEM <span>↗</span>
            </div>
            
            <div className="stack-diagram">
              {currentCombination?.stack.map((tech, idx) => (
                <div key={tech + idx} className="stack-node">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: SKILL_DATA[activeCategory || 'FRONTEND'].color }}></span>
                  {tech}
                </div>
              ))}
              
              {/* Connecting lines drawn via CSS */}
              <div className="stack-connector stack-c1"></div>
              <div className="stack-connector stack-c2"></div>
              <div className="stack-connector stack-c3"></div>
            </div>
            
            <div className="absolute -bottom-6 right-0 font-['Caveat'] text-xl text-[var(--mist)] opacity-70 rotate-[-5deg]">
              One of the many<br/>stacks I build with.
            </div>
          </div>
          
        </div>
      )}

      {/* 3. Central Orbital System (Desktop) */}
      {!isMobile && (
        <div 
          ref={orbitSystemRef}
          className="orbit-system-container z-10"
          style={{
            transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
          }}
        >
          {/* Central Core */}
          <div className="orbit-core" style={{ transform: `translate(${-mousePos.x * 5}px, ${-mousePos.y * 5}px)` }}>
            <div className="orbit-core-inner">
              <span className="core-text">IDEAS</span>
              <span className="core-arrow">↓</span>
              <span className="core-text">PRODUCTS</span>
            </div>
          </div>

          {/* Orbital Paths and Nodes */}
          {Object.entries(SKILL_DATA).map(([key, data]) => {
            const pos = ORBIT_POSITIONS[key];
            const isActive = activeCategory === key;
            const isDimmed = activeCategory && activeCategory !== key;
            
            return (
              <div key={key} className={`orbit-layer ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}>
                
                {/* Thin Ring */}
                <div 
                  className="orbit-path"
                  style={{
                    width: `${pos.radius * 2}px`,
                    height: `${pos.radius * 2}px`,
                    top: `calc(50% - ${pos.radius}px)`,
                    left: `calc(50% - ${pos.radius}px)`,
                  }}
                ></div>

                {/* The Category Node */}
                <div 
                  className="orbit-node"
                  onMouseEnter={() => handleCategoryHover(key)}
                  onMouseLeave={() => setActiveCategory(null)}
                  style={{
                    top: pos.y,
                    left: pos.x,
                  }}
                >
                  <div className="orbit-orb" style={{ backgroundColor: data.color, boxShadow: `0 0 20px ${data.color}80` }}></div>
                  <div className="orbit-label">
                    <span className="text-white font-bold tracking-wide">{data.label}</span>
                  </div>
                  
                  {/* Surrounding Tech Stack (Visible on hover) */}
                  <div className={`orbit-tech-cluster ${isActive ? 'visible' : ''}`}>
                    {data.items.slice(0, 5).map((item, i) => (
                      <span 
                        key={item.name} 
                        className={`tech-pill ${hoveredSkill === item.name ? 'highlighted' : ''}`}
                        onMouseEnter={() => handleSkillHover(item.name, key)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
          
          {/* Microcopy Details */}
          <div className="orbit-microcopy orbit-micro-1">SYSTEM / BUILDING</div>
          <div className="orbit-microcopy orbit-micro-2">MODE / FULL-STACK</div>
          <div className="orbit-microcopy orbit-micro-3">VERSION / 03</div>
        </div>
      )}

      {/* Mobile Interactive Vertical System */}
      {isMobile && (
        <div className="mobile-skills-system mt-12 mb-8 relative z-20">
          <div className="font-['Caveat'] text-2xl text-[var(--mist)] rotate-[-2deg] opacity-70 mb-8">
            How I turn ideas into reality.
          </div>
          
          <div className="flex flex-col gap-6">
            {Object.entries(SKILL_DATA).map(([key, data]) => (
              <div key={key} className="mobile-category-block">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color, boxShadow: `0 0 10px ${data.color}` }}></div>
                  <h3 className="text-xl font-bold tracking-wide text-white uppercase">{data.label}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {data.items.map((item) => (
                    <div 
                      key={item.name} 
                      className={`mobile-tech-pill ${hoveredSkill === item.name ? 'active' : ''}`}
                      onClick={() => setHoveredSkill(hoveredSkill === item.name ? null : item.name)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
                
                {/* Mobile Active Skill Description */}
                <div className={`mobile-skill-desc overflow-hidden transition-all duration-300 ${data.items.some(i => i.name === hoveredSkill) ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                  {data.items.find(i => i.name === hoveredSkill)?.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Bottom Index (Desktop) */}
      {!isMobile && (
        <div className="skills-index absolute bottom-0 left-0 w-full z-20 flex flex-row border-t border-[var(--line)] bg-[var(--ink)]">
          {Object.entries(SKILL_DATA).map(([key, data], idx) => {
            const isActive = activeCategory === key;
            const isDimmed = activeCategory && !isActive;
            
            return (
              <div 
                key={key} 
                className={`index-column flex-1 border-r border-[var(--line)] p-6 transition-opacity duration-300 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
                onMouseEnter={() => handleCategoryHover(key)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono text-[var(--dim)]">0{idx + 1}</span>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }}></div>
                  <span className="text-sm font-bold text-white tracking-wide uppercase">{data.label}</span>
                </div>
                
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {data.items.map((item, i) => (
                    <span 
                      key={item.name} 
                      className={`text-xs font-mono transition-colors duration-200 cursor-default ${
                        hoveredSkill === item.name 
                          ? 'text-white' 
                          : isActive ? 'text-[var(--bone)]' : 'text-[var(--dim)]'
                      }`}
                      onMouseEnter={() => handleSkillHover(item.name, key)}
                    >
                      {item.name}{i < data.items.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Projects Transition */}
      <div className="projects-transition-prompt">
        <a href="#projects" className="group flex flex-col items-end text-right">
          <span className="text-[10px] font-mono tracking-widest text-[var(--dim)] uppercase mb-2">Ready to see what I built?</span>
          <span className="text-xl font-bold text-[var(--bone)] group-hover:text-[var(--tide)] transition-colors duration-300 flex items-center gap-2">
            ↓ WORK / PROJECTS
          </span>
        </a>
      </div>

    </section>
  );
}
