import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export function TrainingStation({ project, position }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const stationRef = useRef();

  useFrame((state, delta) => {
    if (stationRef.current) {
      if (hovered || active) {
        // Slow rotation when hovered
        stationRef.current.rotation.y += delta * 0.5;
      }
    }
  });

  const handleInteract = (e) => {
    e.stopPropagation();
    setActive(!active);
  };

  return (
    <group position={position}>
      {/* Training Equipment Placeholder (e.g. cone / target) */}
      <mesh 
        ref={stationRef}
        castShadow 
        receiveShadow
        onClick={handleInteract}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        position={[0, 0.5, 0]}
      >
        <coneGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial 
          color={hovered || active ? "var(--accent)" : "#444444"} 
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Base platform */}
      <mesh receiveShadow position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Project Info Overlay */}
      {active && (
        <Html position={[0, 2, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-black/90 border border-white/20 p-6 w-80 backdrop-blur-xl">
            <h3 className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-bebas)' }}>{project.title}</h3>
            <p className="text-neutral-400 text-xs mb-4">{project.tagline}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map(tech => (
                <span key={tech} className="text-[9px] border border-white/10 px-2 py-1 text-neutral-300 rounded-sm uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              {project.keyFeatures.slice(0, 3).map(feature => (
                <div key={feature} className="text-xs text-neutral-300 flex items-start">
                  <span className="text-[10px] text-accent mr-2 mt-[2px]">■</span>
                  {feature}
                </div>
              ))}
            </div>

            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noreferrer"
                className="block text-center text-xs tracking-widest border border-white/30 py-3 text-white hover:bg-white hover:text-black transition-colors"
                style={{ fontFamily: 'var(--font-bebas)' }}
              >
                VIEW SOURCE
              </a>
            )}
          </div>
        </Html>
      )}

      {/* Floating title when not active */}
      {!active && (
        <Html position={[0, 1.5, 0]} center>
          <div className={`text-white text-lg tracking-widest whitespace-nowrap transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: 'var(--font-bebas)' }}>
            {project.title}
          </div>
        </Html>
      )}
    </group>
  );
}
