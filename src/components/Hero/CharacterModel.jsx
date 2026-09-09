import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CharacterEyes from './CharacterEyes';
import CharacterMask from './CharacterMask';
import { useMousePosition } from '../../hooks/useMousePosition';

export default function CharacterModel({ scrollData }) {
  const headGroup = useRef();
  const faceShell = useRef();
  const jaw = useRef();
  const leftBrow = useRef();
  const rightBrow = useRef();
  const neck = useRef();
  
  const mouse = useMousePosition();

  // Premium Sculptural Materials
  const skinMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1c',
    roughness: 0.4,
    metalness: 0.6,
    flatShading: false,
  }), []);

  useFrame((state) => {
    const progress = scrollData.current;
    
    // Base idle breathing and floating
    const time = state.clock.elapsedTime;
    const idleY = Math.sin(time * 1.5) * 0.02;
    const idleRotX = Math.sin(time * 0.8) * 0.02;
    
    // Head follows mouse subtly
    let headRotX = mouse.y * 0.1;
    let headRotY = mouse.x * 0.15;

    // Transition States
    let jawOpen = 0;
    let browAngry = 0;
    let scaleY = 1;
    let zOffset = 0;
    
    if (progress > 0.25 && progress <= 0.75) {
      // Crazy face mapping (peaks at ~0.65)
      let crazyIntensity = 0;
      if (progress <= 0.65) {
         crazyIntensity = (progress - 0.25) / 0.40;
      } else {
         // Start reducing for mask
         crazyIntensity = 1 - (progress - 0.65) / 0.10;
      }
      
      jawOpen = crazyIntensity * 0.4;
      browAngry = crazyIntensity * 0.2;
      scaleY = 1 + crazyIntensity * 0.15;
      zOffset = crazyIntensity * 0.3; // moves forward
      
      // Asymmetrical head tilt in crazy state
      headRotX += crazyIntensity * 0.1;
      headRotY -= crazyIntensity * 0.15;
    }

    if (progress > 0.70) {
      // Mask state head tilts back to neutral/calm but distinct
      const maskProgress = Math.min(1, (progress - 0.70) / 0.30);
      headRotX = THREE.MathUtils.lerp(headRotX, -0.05, maskProgress);
      headRotY = THREE.MathUtils.lerp(headRotY, mouse.x * 0.05, maskProgress); // less tracking
      zOffset = THREE.MathUtils.lerp(zOffset, 0.5, maskProgress); // moves even closer
    }

    // Apply Transformations
    if (headGroup.current) {
      headGroup.current.position.y = idleY;
      headGroup.current.position.z = zOffset;
      headGroup.current.rotation.x += (headRotX + idleRotX - headGroup.current.rotation.x) * 0.1;
      headGroup.current.rotation.y += (headRotY - headGroup.current.rotation.y) * 0.1;
    }

    if (faceShell.current) {
      faceShell.current.scale.y += (scaleY - faceShell.current.scale.y) * 0.1;
    }

    if (jaw.current) {
      jaw.current.position.y += (-0.2 - jawOpen - jaw.current.position.y) * 0.2;
      jaw.current.rotation.x += (jawOpen * 0.5 - jaw.current.rotation.x) * 0.2;
    }

    if (leftBrow.current) leftBrow.current.rotation.z += (browAngry - leftBrow.current.rotation.z) * 0.1;
    if (rightBrow.current) rightBrow.current.rotation.z += (-browAngry - rightBrow.current.rotation.z) * 0.1;
  });

  return (
    <group ref={headGroup}>
      {/* Neck */}
      <mesh ref={neck} position={[0, -1.2, -0.2]} material={skinMaterial}>
        <cylinderGeometry args={[0.4, 0.6, 1.5, 32]} />
      </mesh>

      {/* Main Face Shell */}
      <mesh ref={faceShell} position={[0, 0.2, 0]} material={skinMaterial}>
        <icosahedronGeometry args={[0.9, 3]} />
      </mesh>

      {/* Jaw */}
      <mesh ref={jaw} position={[0, -0.2, 0.1]} material={skinMaterial}>
        <boxGeometry args={[0.9, 0.6, 0.9]} />
      </mesh>

      {/* Eyebrows */}
      <mesh ref={leftBrow} position={[-0.35, 0.5, 0.8]} material={skinMaterial}>
        <boxGeometry args={[0.3, 0.08, 0.1]} />
      </mesh>
      <mesh ref={rightBrow} position={[0.35, 0.5, 0.8]} material={skinMaterial}>
        <boxGeometry args={[0.3, 0.08, 0.1]} />
      </mesh>

      {/* Eyes & Tracking */}
      <CharacterEyes scrollData={scrollData} />

      {/* Mask (appears at the end) */}
      <CharacterMask scrollData={scrollData} />
    </group>
  );
}
