import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './ui/FadeIn';
import LiveProjectButton from './ui/LiveProjectButton';

const projects = [
  {
    num: "01",
    client: "Client",
    name: "Nextlevel Studio",
    images: {
      col1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      col1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    }
  },
  {
    num: "02",
    client: "Personal",
    name: "Aura Brand Identity",
    images: {
      col1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      col1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    }
  },
  {
    num: "03",
    client: "Client",
    name: "Solaris Digital",
    images: {
      col1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  }
];

function ProjectCard({ project, index, totalCards }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const { scrollYProgress: scaleProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scale down as we scroll past
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scaleProgress, [0, 1], [1, targetScale]);
  
  return (
    <div 
      ref={containerRef} 
      className="h-[85vh] w-full flex items-center justify-center sticky top-24 md:top-32"
      style={{ 
        marginTop: index === 0 ? 0 : '10vh'
      }}
    >
      <motion.div 
        style={{ scale, top: `calc(${index * 28}px)` }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 will-change-transform shadow-2xl"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="text-[#D7E2EA] font-black text-[clamp(2.5rem,8vw,100px)] leading-none">
              {project.num}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA]/60 font-medium uppercase tracking-wider text-sm sm:text-base mb-1">
                {project.client}
              </span>
              <h3 className="text-[#D7E2EA] font-black uppercase text-[clamp(1.5rem,4vw,3rem)] leading-none tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>
          
          <LiveProjectButton className="px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hidden sm:block" />
        </div>

        {/* Bottom Row: Image Grid */}
        <div className="flex w-full gap-4 sm:gap-6 md:gap-8">
          
          {/* Left Col (40%) */}
          <div className="flex flex-col w-[40%] gap-4 sm:gap-6 md:gap-8">
            <div className="w-full h-[clamp(130px,16vw,230px)] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden">
              <img src={project.images.col1_1} alt="Project Detail" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="w-full h-[clamp(160px,22vw,340px)] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden">
              <img src={project.images.col1_2} alt="Project Detail" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Right Col (60%) */}
          <div className="w-[60%] h-full min-h-[300px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden">
            <img src={project.images.col2} alt="Project Main" className="w-full h-full object-cover" loading="lazy" />
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section 
      id="projects" 
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-40"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
        
        {/* Heading */}
        <FadeIn y={40} className="w-full mb-16 sm:mb-20 md:mb-28">
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight">
            Project
          </h2>
        </FadeIn>

        {/* Sticky Stacking Cards */}
        <div className="w-full relative">
          {projects.map((proj, i) => (
            <ProjectCard 
              key={proj.num} 
              project={proj} 
              index={i} 
              totalCards={projects.length} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
