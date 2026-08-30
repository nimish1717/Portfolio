import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-bg overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 mix-blend-difference pointer-events-none flex justify-between items-center">
        <Link href="/" className="pointer-events-auto font-bebas text-2xl tracking-widest text-white hover:text-accent transition-colors flex items-center gap-2">
          <span className="text-xl">←</span> BACK TO WORK
        </Link>
        <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
          CASE STUDY
        </span>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-white/5">
          <img 
            src={project.screenshots[0] || "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"}
            alt={project.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-5xl flex flex-col items-center text-center mt-24">
          <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase text-white mb-6">
            {project.title}
          </h1>
          <p className="font-mono text-sm md:text-base tracking-widest text-fg/80 max-w-2xl">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="relative z-10 bg-bg w-full py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-32">
          
          {/* Metadata Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/10">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-fg/40">ROLE</span>
              <span className="font-mono text-xs tracking-widest uppercase text-fg/90">FULL-STACK ENGINEER</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-fg/40">YEAR</span>
              <span className="font-mono text-xs tracking-widest uppercase text-fg/90">2024</span>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-fg/40">STACK</span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(t => (
                  <span key={t} className="font-mono text-[10px] tracking-widest uppercase text-fg/80">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Context & Problem */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="font-bebas text-4xl tracking-wider uppercase text-white">THE PROBLEM</h2>
            </div>
            <div className="md:col-span-8 flex flex-col gap-6">
              <p className="text-lg md:text-xl leading-relaxed text-fg/80 font-light">
                {project.problemStatement}
              </p>
            </div>
          </div>

          {/* Solution & Implementation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="font-bebas text-4xl tracking-wider uppercase text-accent">THE SOLUTION</h2>
            </div>
            <div className="md:col-span-8 flex flex-col gap-12">
              <p className="text-lg md:text-xl leading-relaxed text-fg/80 font-light">
                {project.solutionOverview}
              </p>
              
              <div className="flex flex-col gap-4 p-8 bg-white/[0.02] border border-white/5">
                <h3 className="font-mono text-xs tracking-widest uppercase text-fg/50">ENGINEERING CHALLENGES</h3>
                <p className="text-sm md:text-base leading-relaxed text-fg/70">
                  {project.engineeringChallenges}
                </p>
              </div>
              
              <div className="flex flex-col gap-4 p-8 bg-white/[0.02] border border-white/5">
                <h3 className="font-mono text-xs tracking-widest uppercase text-fg/50">DESIGN DECISIONS</h3>
                <p className="text-sm md:text-base leading-relaxed text-fg/70">
                  {project.designDecisions}
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="font-bebas text-4xl tracking-wider uppercase text-white">KEY FEATURES</h2>
            </div>
            <div className="md:col-span-8">
              <ul className="flex flex-col gap-6">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-accent mt-1">0{i+1}</span>
                    <span className="text-lg md:text-xl text-fg/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Outro CTA */}
      <section className="w-full py-32 bg-white flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-bebas text-5xl md:text-7xl tracking-tighter uppercase text-bg mb-8">
          WANT TO SEE THE CODE?
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {project.githubLink && (
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="bg-bg text-white font-mono text-xs tracking-widest uppercase px-8 py-4 hover:bg-bg/80 transition-colors"
            >
              VIEW ON GITHUB ↗
            </a>
          )}
          <Link 
            href="/"
            className="border border-bg/20 text-bg font-mono text-xs tracking-widest uppercase px-8 py-4 hover:bg-bg/5 transition-colors"
          >
            BACK TO PORTFOLIO
          </Link>
        </div>
      </section>

    </main>
  );
}
