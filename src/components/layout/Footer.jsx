import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Magnetic } from "@/components/ui/Magnetic";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold tracking-tight text-white mb-2">
            Nimish Agrawal
          </h2>
          <p className="text-sm text-neutral-400">
            Computer Engineering Student @ Thapar Institute
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Magnetic>
            <Link
              href="https://github.com/nimishagrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
            >
              <FaGithub size={20} />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="https://linkedin.com/in/nimishagrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
            >
              <FaLinkedin size={20} />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="mailto:contact@nimishagrawal.com"
              className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
            >
              <Mail size={20} />
            </Link>
          </Magnetic>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-neutral-600">
        &copy; {new Date().getFullYear()} Nimish Agrawal. Designed and built
        with Next.js.
      </div>
    </footer>
  );
}
