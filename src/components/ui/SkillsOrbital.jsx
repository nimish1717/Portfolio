"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Cpu, Layout, Server, Cloud, MonitorSmartphone, BrainCircuit } from "lucide-react";
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql, SiMongodb } from "react-icons/si";

const skillNodes = [
  // Inner Ring (Frontend)
  { id: "react", icon: <FaReact size={24} />, name: "React", category: "Frontend", radius: 120, angle: 0, speed: 10, color: "#61dafb" },
  { id: "next", icon: <SiNextdotjs size={24} />, name: "Next.js", category: "Frontend", radius: 120, angle: 120, speed: 10, color: "#ffffff" },
  { id: "tailwind", icon: <SiTailwindcss size={24} />, name: "Tailwind", category: "Frontend", radius: 120, angle: 240, speed: 10, color: "#38bdf8" },
  
  // Middle Ring (Backend / DB)
  { id: "node", icon: <FaNodeJs size={24} />, name: "Node.js", category: "Backend", radius: 220, angle: 45, speed: -15, color: "#339933" },
  { id: "postgres", icon: <SiPostgresql size={24} />, name: "PostgreSQL", category: "Database", radius: 220, angle: 135, speed: -15, color: "#336791" },
  { id: "mongo", icon: <SiMongodb size={24} />, name: "MongoDB", category: "Database", radius: 220, angle: 225, speed: -15, color: "#47a248" },
  { id: "ts", icon: <SiTypescript size={24} />, name: "TypeScript", category: "Language", radius: 220, angle: 315, speed: -15, color: "#3178c6" },
  
  // Outer Ring (AI / Tools)
  { id: "python", icon: <FaPython size={24} />, name: "Python", category: "AI / ML", radius: 320, angle: 0, speed: 25, color: "#3776ab" },
  { id: "ml", icon: <BrainCircuit size={24} />, name: "Machine Learning", category: "AI / ML", radius: 320, angle: 72, speed: 25, color: "#a855f7" },
  { id: "docker", icon: <FaDocker size={24} />, name: "Docker", category: "DevOps", radius: 320, angle: 144, speed: 25, color: "#2496ed" },
  { id: "git", icon: <FaGithub size={24} />, name: "Git", category: "DevOps", radius: 320, angle: 216, speed: 25, color: "#f05032" },
  { id: "cpp", icon: <Code2 size={24} />, name: "C++", category: "Language", radius: 320, angle: 288, speed: 25, color: "#00599c" },
];

export function SkillsOrbital() {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      
      {/* Orbital Rings Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[240px] h-[240px] rounded-full border border-white/10 border-dashed absolute"></div>
        <div className="w-[440px] h-[440px] rounded-full border border-white/5 border-dashed absolute"></div>
        <div className="w-[640px] h-[640px] rounded-full border border-white/[0.02] border-dashed absolute"></div>
      </div>

      {/* Central Core */}
      <div className="relative z-10 w-24 h-24 rounded-full bg-[#111] border-2 border-[#a855f7] shadow-[0_0_50px_rgba(168,85,247,0.4)] flex items-center justify-center">
        <Code2 size={40} className="text-[#a855f7]" />
      </div>

      {/* Orbiting Nodes */}
      {skillNodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute left-1/2 top-1/2 -ml-6 -mt-6"
          animate={{ rotate: 360 }}
          transition={{ duration: Math.abs(node.speed), repeat: Infinity, ease: "linear", repeatType: "loop", direction: node.speed > 0 ? "normal" : "reverse" }}
          style={{ width: 48, height: 48, transformOrigin: "24px 24px" }}
        >
          <motion.div
            className="absolute w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center bg-black/50 backdrop-blur-md cursor-pointer hover:border-[var(--accent)] hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            style={{ 
              transform: `rotate(${node.angle}deg) translateX(${node.radius}px) rotate(-${node.angle}deg)`, 
            }}
            // Counter-rotate the inner div to keep icon upright
            animate={{ rotate: -360 }}
            transition={{ duration: Math.abs(node.speed), repeat: Infinity, ease: "linear", direction: node.speed > 0 ? "reverse" : "normal" }}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div style={{ color: hoveredNode?.id === node.id ? node.color : "#9ca3af" }} className="transition-colors duration-300">
              {node.icon}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Hover Info Panel */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute top-10 right-10 p-6 glass rounded-2xl border border-[var(--accent)] bg-black/80 backdrop-blur-lg min-w-[200px]"
          >
            <span className="text-[#a855f7] text-xs font-mono tracking-widest uppercase block mb-1">
              {hoveredNode.category}
            </span>
            <h3 className="text-xl font-bold text-white mb-2">{hoveredNode.name}</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-[#a855f7] to-transparent rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
