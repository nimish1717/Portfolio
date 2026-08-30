"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const fluidVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fluidFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;

  // Classic Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Add distortion using noise and time
    float noise1 = snoise(uv * 2.0 + uTime * 0.2);
    float noise2 = snoise(uv * 4.0 - uTime * 0.3);
    
    vec2 distortedUv = uv + vec2(noise1, noise2) * 0.15;
    
    // Mix colors based on distorted UV and noise
    float mixRatio1 = smoothstep(-0.5, 0.5, snoise(distortedUv * 3.0 + uTime * 0.1));
    float mixRatio2 = smoothstep(-0.5, 0.5, snoise(distortedUv * 2.0 - uTime * 0.15));
    
    vec3 finalColor = mix(uColor1, uColor2, mixRatio1);
    finalColor = mix(finalColor, uColor3, mixRatio2);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function FluidPlane({ activeProject }) {
  const materialRef = useRef();

  // Define colors based on activeProject index
  const colors = useMemo(() => {
    // Project 1: Purple/Pink
    // Project 2: Green/Teal
    // Project 3: Red/Orange
    const palettes = [
      [new THREE.Color("#1a0533"), new THREE.Color("#7c3aed"), new THREE.Color("#a855f7")],
      [new THREE.Color("#0a1f0a"), new THREE.Color("#22c55e"), new THREE.Color("#14b8a6")],
      [new THREE.Color("#1a0a0a"), new THREE.Color("#ef4444"), new THREE.Color("#f97316")],
    ];
    return activeProject !== null ? palettes[activeProject % palettes.length] : palettes[0];
  }, [activeProject]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: colors[0] },
      uColor2: { value: colors[1] },
      uColor3: { value: colors[2] },
    }),
    [colors]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate colors if they change
      materialRef.current.uniforms.uColor1.value.lerp(colors[0], 0.05);
      materialRef.current.uniforms.uColor2.value.lerp(colors[1], 0.05);
      materialRef.current.uniforms.uColor3.value.lerp(colors[2], 0.05);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function FluidImage({ activeProject }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
      >
        <FluidPlane activeProject={activeProject} />
      </Canvas>
    </div>
  );
}
