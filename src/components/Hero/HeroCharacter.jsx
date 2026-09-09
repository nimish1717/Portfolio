import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CharacterModel from './CharacterModel';
import CharacterEffects from './CharacterEffects';

// Camera controller for parallax effect
function CameraController({ scrollData }) {
  const cameraRef = useRef();
  
  useFrame((state) => {
    if (!cameraRef.current) return;
    
    // Very subtle camera parallax based on mouse (done manually or via state.pointer)
    // We'll let the model do the heavy tracking, camera just has a tiny drift
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.5;
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroCharacter({ scrollData }) {
  // Mobile check to reduce quality
  const isMobile = window.innerWidth <= 768;
  const dpr = isMobile ? [1, 1.5] : [1, 2];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={dpr}
        gl={{ powerPreference: 'high-performance', antialias: !isMobile }}
        shadows={!isMobile}
      >
        <Suspense fallback={null}>
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          
          {/* Key Light */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
            castShadow={!isMobile}
            shadow-mapSize={[1024, 1024]}
          />
          
          {/* Rim Light for cinematic edge */}
          <directionalLight
            position={[-5, 5, -5]}
            intensity={3}
            color="#4a4a6a"
          />

          <Environment preset="city" />

          {/* Model */}
          <CharacterModel scrollData={scrollData} />
          
          {/* Post Processing */}
          <CharacterEffects showEffects={!isMobile} />
          
          <CameraController scrollData={scrollData} />
        </Suspense>
      </Canvas>
    </div>
  );
}
