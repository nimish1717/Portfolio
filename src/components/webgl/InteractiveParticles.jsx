"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader material for interactive particles
const particleVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aScale;
  attribute float aRandomness;
  
  varying float vAlpha;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Wave animation
    modelPosition.y += sin(uTime * 0.5 + modelPosition.x * 2.0) * aRandomness * 0.5;
    modelPosition.z += cos(uTime * 0.3 + modelPosition.y * 2.0) * aRandomness * 0.5;
    
    // Mouse repulsion
    vec2 pos2d = vec2(modelPosition.x, modelPosition.y);
    float dist = distance(pos2d, uMouse * 10.0);
    if (dist < 3.0) {
      vec2 dir = normalize(pos2d - uMouse * 10.0);
      modelPosition.x += dir.x * (3.0 - dist) * 0.5;
      modelPosition.y += dir.y * (3.0 - dist) * 0.5;
    }

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    
    // Size attenuation
    gl_PointSize = aScale * (10.0 / -viewPosition.z);
    
    // Alpha fade based on z
    vAlpha = smoothstep(-5.0, 5.0, modelPosition.z) * 0.5 + 0.1;
  }
`;

const particleFragmentShader = `
  varying float vAlpha;
  
  void main() {
    // Soft circle
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    // Acid lime color: vec3(0.91, 1.0, 0.28)
    gl_FragColor = vec4(0.91, 1.0, 0.28, vAlpha * (0.5 - dist));
  }
`;

function Particles({ count = 1500 }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const { viewport } = useThree();

  const [positions, scales, randomness] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const rnd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread particles across the viewport width/height
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z

      scl[i] = Math.random() * 8 + 2;
      rnd[i] = Math.random();
    }
    return [pos, scl, rnd];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    const { clock, pointer } = state;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
      // pointer is normalized -1 to 1
      materialRef.current.uniforms.uMouse.value.set(
        (pointer.x * viewport.width) / 20, 
        (pointer.y * viewport.height) / 20
      );
    }
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={count}
          array={randomness}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function InteractiveParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
      >
        <Particles count={2500} />
      </Canvas>
    </div>
  );
}
