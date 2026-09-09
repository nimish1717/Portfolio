import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CharacterMask({ scrollData }) {
  const maskGroup = useRef();
  
  // Mask Plates Refs
  const foreheadPlate = useRef();
  const leftCheekPlate = useRef();
  const rightCheekPlate = useRef();
  const mouthPlate = useRef();
  const chinPlate = useRef();

  // Futuristic Mask Material
  const maskMaterial = new THREE.MeshPhysicalMaterial({
    color: '#0d0d0f',
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  // Base positions for plates
  const plates = [
    { ref: foreheadPlate, pos: [0, 0.6, 0.7], rot: [-0.1, 0, 0], scale: [0.9, 0.4, 0.5] },
    { ref: leftCheekPlate, pos: [-0.4, 0.1, 0.65], rot: [0, 0.4, 0.2], scale: [0.3, 0.5, 0.2] },
    { ref: rightCheekPlate, pos: [0.4, 0.1, 0.65], rot: [0, -0.4, -0.2], scale: [0.3, 0.5, 0.2] },
    { ref: mouthPlate, pos: [0, -0.2, 0.8], rot: [0.1, 0, 0], scale: [0.6, 0.3, 0.3] },
    { ref: chinPlate, pos: [0, -0.5, 0.75], rot: [0.2, 0, 0], scale: [0.5, 0.3, 0.3] },
  ];

  useFrame(() => {
    const progress = scrollData.current;
    
    // Mask transitions from 0.70 to 1.0
    let maskProgress = 0;
    if (progress > 0.70) {
      maskProgress = Math.min(1, (progress - 0.70) / 0.30);
    }
    
    // Ease out cubic
    const ease = 1 - Math.pow(1 - maskProgress, 3);

    if (maskGroup.current) {
      // Reveal the mask by scaling and moving forward slightly
      maskGroup.current.visible = maskProgress > 0.01;
      
      plates.forEach((plate, i) => {
        if (plate.ref.current) {
          // Stagger effect
          const staggerOffset = i * 0.1;
          let pProgress = Math.max(0, Math.min(1, ease * 1.5 - staggerOffset));
          
          // Animate scale from 0 to 1
          plate.ref.current.scale.set(
            plate.scale[0] * pProgress,
            plate.scale[1] * pProgress,
            plate.scale[2] * pProgress
          );

          // Animate position (coming from inside the head)
          plate.ref.current.position.set(
            plate.pos[0],
            plate.pos[1],
            plate.pos[2] - (1 - pProgress) * 0.5
          );
        }
      });
    }
  });

  return (
    <group ref={maskGroup} visible={false}>
      {/* Forehead */}
      <mesh ref={foreheadPlate} material={maskMaterial}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      
      {/* Cheeks */}
      <mesh ref={leftCheekPlate} material={maskMaterial}>
        <cylinderGeometry args={[1, 0.5, 1, 3]} />
      </mesh>
      <mesh ref={rightCheekPlate} material={maskMaterial}>
        <cylinderGeometry args={[1, 0.5, 1, 3]} />
      </mesh>
      
      {/* Mouth Guard */}
      <mesh ref={mouthPlate} material={maskMaterial}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      
      {/* Chin */}
      <mesh ref={chinPlate} material={maskMaterial}>
        <coneGeometry args={[1, 1, 4]} />
      </mesh>
    </group>
  );
}
