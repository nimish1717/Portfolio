"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Edges } from "@react-three/drei";
import * as THREE from "three";

function CubeNode({ position, color = "#a855f7", size = 0.5 }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshPhysicalMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          transparent 
          opacity={0.8} 
          roughness={0.2} 
          metalness={0.8}
        />
        <Edges scale={1.05} color="#ffffff" />
      </mesh>
    </Float>
  );
}

function Network() {
  const group = useRef();
  
  // Define positions for nodes
  const nodes = useMemo(() => [
    [0, 0, 0], // Center
    [2, 1, -1],
    [-1.5, 2, 1],
    [1.5, -2, 1],
    [-2, -1, -2],
    [0, -2.5, -1],
    [0, 2.5, 0],
    [2.5, -0.5, 0],
    [-2.5, 0.5, 1],
  ], []);

  // Define connections (pairs of indices)
  const connections = useMemo(() => [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 6], [2, 6], [2, 8], [4, 8],
    [3, 5], [4, 5], [1, 7], [3, 7]
  ], []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {nodes.map((pos, i) => (
        <CubeNode 
          key={i} 
          position={pos} 
          size={i === 0 ? 0.8 : 0.4} 
          color={i === 0 ? "#8b5cf6" : "#6d28d9"} 
        />
      ))}
      
      {connections.map(([startIdx, endIdx], i) => (
        <Line
          key={`line-${i}`}
          points={[nodes[startIdx], nodes[endIdx]]}
          color="#a855f7"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
      
      {/* Subtle floating particles in the background */}
      <Particles />
    </group>
  );
}

function Particles() {
  const mesh = useRef();
  
  const [positions] = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return [positions];
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function TechCubeNetwork() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        <Network />
      </Canvas>
    </div>
  );
}
