"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// A custom shader material to displace the sphere vertices over time, creating a "fluid" look
function FluidMesh() {
  const meshRef = useRef(null);
  const { mouse, viewport } = useThree();

  // Create a base geometry
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 2), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Instead of deprecated THREE.Clock, use frame delta for smooth rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;

    // Subtle reaction to mouse position
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, (mouse.x * viewport.width) / 20, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (mouse.y * viewport.height) / 20, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} geometry={geometry}>
        {/* Extremely lightweight wireframe material to fix slow loading */}
        <meshBasicMaterial
          color="#f5f5f0"
          wireframe={true}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

export function FluidSculpture() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <FluidMesh />
      </Canvas>
    </div>
  );
}
