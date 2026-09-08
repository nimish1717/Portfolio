import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TechStack.css';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  'C++', 'JavaScript', 'TypeScript', 'Python', 'SQL',
  'React', 'Next.js', 'Three.js', 'Tailwind', 'GSAP',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker',
  'Git', 'HTML', 'CSS', 'Vite', 'REST API',
];

function SkillText({ text, position, color }) {
  const ref = useRef();
  const speed = useMemo(() => 0.2 + Math.random() * 0.3, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3;
      ref.current.lookAt(state.camera.position);
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.35}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
      material-transparent
      material-opacity={0.9}
      material-toneMapped={false}
    >
      {text}
    </Text>
  );
}

function SkillCloud() {
  const groupRef = useRef();

  // Distribute skills on a sphere using Fibonacci spiral
  const positions = useMemo(() => {
    const pts = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const n = SKILLS.length;

    for (let i = 0; i < n; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const r = 3.5;

      pts.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {SKILLS.map((skill, i) => (
        <Float key={skill} speed={1} rotationIntensity={0} floatIntensity={0.5}>
          <SkillText
            text={skill}
            position={positions[i]}
            color={i % 3 === 0 ? '#14b8a6' : i % 3 === 1 ? '#5eead4' : '#ffffff'}
          />
        </Float>
      ))}

      {/* Center glow sphere */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#14b8a6" toneMapped={false} />
      </mesh>

      {/* Wireframe sphere outline */}
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#14b8a6"
          wireframe
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  );
}

export default function TechStack() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="techstack-section" id="techstack">
      <h3 ref={titleRef} className="techstack-title">Tech Stack</h3>
      <div className="techstack-canvas">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ alpha: false, antialias: true }}
          style={{ background: '#0a0a0a' }}
        >
          <color attach="background" args={['#0a0a0a']} />
          <fog attach="fog" args={['#0a0a0a', 6, 18]} />
          <ambientLight intensity={0.3} />
          <SkillCloud />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(3 * Math.PI) / 4}
          />
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  );
}
