import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    <main className="flex flex-col min-h-screen relative overflow-hidden bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto w-full">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-[var(--accent)] transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          {project.title}
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 mb-8 leading-relaxed font-light">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          {project.githubLink && (
            <Link
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-colors"
            >
              <FaGithub size={18} />
              <span>View Source</span>
            </Link>
          )}
          {project.liveLink && (
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-black font-medium hover:scale-105 transition-transform"
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </Link>
          )}
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-16">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 text-sm font-mono rounded-lg bg-white/5 border border-white/10 text-[var(--accent)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Visual Preview Placeholder */}
        <div className="w-full aspect-video rounded-3xl glass border border-white/10 overflow-hidden relative mb-24 bg-neutral-900 flex items-center justify-center">
          <span className="font-mono text-neutral-600">
            [Project Preview Image / Video]
          </span>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-6 w-full space-y-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-2xl font-bold text-white md:col-span-1">
            The Problem
          </h2>
          <div className="md:col-span-2 text-neutral-400 text-lg leading-relaxed">
            <p>{project.problemStatement}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-2xl font-bold text-white md:col-span-1">
            Solution Overview
          </h2>
          <div className="md:col-span-2 text-neutral-400 text-lg leading-relaxed">
            <p>{project.solutionOverview}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-2xl font-bold text-white md:col-span-1">
            System Architecture
          </h2>
          <div className="md:col-span-2 text-neutral-400 text-lg leading-relaxed">
            <p>{project.architecture}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-2xl font-bold text-white md:col-span-1">
            Key Features
          </h2>
          <div className="md:col-span-2">
            <ul className="space-y-4">
              {project.keyFeatures.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-neutral-400 text-lg"
                >
                  <span className="text-[var(--accent)] mt-1">▹</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-2xl font-bold text-white md:col-span-1">
            Engineering Challenges
          </h2>
          <div className="md:col-span-2 text-neutral-400 text-lg leading-relaxed">
            <p>{project.engineeringChallenges}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-2xl font-bold text-white md:col-span-1">
            Design Decisions
          </h2>
          <div className="md:col-span-2 text-neutral-400 text-lg leading-relaxed">
            <p>{project.designDecisions}</p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-white/10 py-16">
        <div className="max-w-4xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-8">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start w-full md:w-1/2 text-left p-6 rounded-2xl hover:bg-white/5 transition-colors"
            >
              <span className="text-neutral-500 text-sm mb-2 group-hover:text-white transition-colors">
                Previous Project
              </span>
              <span className="text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div className="w-full md:w-1/2" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end w-full md:w-1/2 text-right p-6 rounded-2xl hover:bg-white/5 transition-colors"
            >
              <span className="text-neutral-500 text-sm mb-2 group-hover:text-white transition-colors">
                Next Project
              </span>
              <span className="text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div className="w-full md:w-1/2" />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
