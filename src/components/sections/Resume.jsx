"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export function Resume() {
  const [viewMode, setViewMode] = useState("document");

  return (
    <section id="resume" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Resume.
            </h2>
            <div className="w-20 h-1 bg-[var(--accent)] rounded-full"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
              <button
                onClick={() => setViewMode("visual")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                  viewMode === "visual"
                    ? "bg-[var(--accent)] text-black"
                    : "text-neutral-400 hover:text-white",
                )}
              >
                <Eye size={16} />
                Visual
              </button>
              <button
                onClick={() => setViewMode("document")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                  viewMode === "document"
                    ? "bg-[var(--accent)] text-black"
                    : "text-neutral-400 hover:text-white",
                )}
              >
                <FileText size={16} />
                Document
              </button>
            </div>

            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-2 rounded-full glass border border-white/10 hover:border-[var(--accent)] text-white transition-colors"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full aspect-[1/1.4] md:aspect-video rounded-3xl overflow-hidden glass border border-white/10 relative"
        >
          {viewMode === "document" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <FileText size={48} className="text-neutral-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Resume Document Preview
              </h3>
              <p className="text-neutral-400 max-w-md">
                In a production environment, this would embed a PDF viewer or an
                image of the actual resume document.
              </p>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-neutral-900 to-black">
              <Eye size={48} className="text-[var(--accent)] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Visual Interactive Resume
              </h3>
              <p className="text-neutral-400 max-w-md">
                This mode can be expanded to show interactive charts for skills,
                interactive timeline graphs, and visual summaries of experience.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
