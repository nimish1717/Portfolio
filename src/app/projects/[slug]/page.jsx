import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { SplitText } from "@/components/ui/SplitText";
import { Nav } from "@/components/sections/Nav";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <main className="min-h-screen bg-bg text-fg relative overflow-x-hidden selection:bg-accent selection:text-black">
      <Nav />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end pb-24 px-6 md:px-10 z-10 pt-32">
        {/* Background Visual (Placeholder for WebGL Fluid if we want, but for now a gradient) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-transparent to-black" />

        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[10px] text-fg/40 hover:text-accent tracking-widest uppercase mb-12 transition-colors cursor-none group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Index
          </Link>

          <h1 className="font-bebas text-[clamp(60px,12vw,180px)] leading-[0.85] tracking-tight uppercase mb-6 mix-blend-difference">
            <SplitText text={project.title} />
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-between items-start md:items-end border-t border-border pt-8 mt-12">
            <p className="font-mono text-sm md:text-base text-fg/60 max-w-xl leading-relaxed">
              {project.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4 shrink-0">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] text-fg/40 border border-border px-3 py-1.5 uppercase tracking-widest"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Large Image Placeholder */}
      <section className="px-6 md:px-10 py-12 max-w-7xl mx-auto w-full">
        <div className="w-full aspect-[21/9] bg-border/30 overflow-hidden relative group">
          <div className="absolute inset-0 bg-accent/5 mix-blend-overlay transition-opacity group-hover:opacity-0" />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-fg/20 uppercase tracking-[0.3em]">
            [Cinematic Project Video / Render]
          </div>
        </div>
      </section>

      {/* Deep Dive Case Study Content */}
      <section className="px-6 md:px-10 py-32 max-w-4xl mx-auto w-full space-y-32">
        {/* Problem */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <h2 className="font-mono text-[11px] text-fg/40 tracking-[0.2em] uppercase sticky top-32">
              01 / The Challenge
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl md:text-3xl font-light leading-relaxed tracking-tight text-fg/90">
              {project.problemStatement}
            </p>
          </div>
        </div>

        {/* Solution */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <h2 className="font-mono text-[11px] text-fg/40 tracking-[0.2em] uppercase sticky top-32">
              02 / The Solution
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg md:text-2xl font-light leading-relaxed tracking-tight text-fg/70 mb-12">
              {project.solutionOverview}
            </p>
            
            <div className="space-y-6 border-l border-accent/30 pl-6">
              {project.keyFeatures.map((feature, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="font-mono text-[10px] text-accent mt-1.5">{String(i+1).padStart(2, "0")}</span>
                  <p className="text-base text-fg/80">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <h2 className="font-mono text-[11px] text-fg/40 tracking-[0.2em] uppercase sticky top-32">
              03 / Engineering
            </h2>
          </div>
          <div className="md:col-span-8 space-y-12">
            <div>
              <h3 className="font-mono text-[10px] text-fg/40 tracking-widest uppercase mb-4">Architecture</h3>
              <p className="text-base md:text-lg text-fg/70 leading-relaxed">
                {project.architecture}
              </p>
            </div>
            <div>
              <h3 className="font-mono text-[10px] text-fg/40 tracking-widest uppercase mb-4">Technical Hurdles</h3>
              <p className="text-base md:text-lg text-fg/70 leading-relaxed">
                {project.engineeringChallenges}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="border-t border-border px-6 md:px-10 py-32 bg-black">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <span className="font-mono text-[10px] text-fg/30 tracking-[0.3em] uppercase block mb-4">
              Next Project
            </span>
            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`} className="group cursor-none block">
                <h2 className="font-bebas text-[clamp(40px,8vw,120px)] leading-[0.8] text-fg group-hover:text-accent transition-colors">
                  {nextProject.title}
                </h2>
              </Link>
            ) : (
              <span className="font-bebas text-[clamp(40px,8vw,120px)] leading-[0.8] text-fg/20">
                END OF LIST
              </span>
            )}
          </div>
          
          <div className="flex gap-6">
             {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-fg/50 hover:text-accent tracking-widest uppercase border border-border px-6 py-3 transition-colors cursor-none"
              >
                View Source ↗
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
