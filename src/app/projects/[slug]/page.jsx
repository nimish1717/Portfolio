import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import CaseStudyClient from "./CaseStudyClient";

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
    <main className="bg-[#0D0D0F] text-[#F1EFEA] selection:bg-accent selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 mix-blend-difference pointer-events-none flex justify-between items-center">
        <Link href="/" className="pointer-events-auto font-bebas text-2xl tracking-widest text-white hover:text-accent transition-colors flex items-center gap-2 group">
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span> BACK TO WORK
        </Link>
        <span className="font-mono text-[9px] tracking-widest text-white/50 uppercase">
          CASE STUDY / {project.title}
        </span>
      </nav>

      <CaseStudyClient project={project} />

    </main>
  );
}
