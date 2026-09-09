import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

export default function CharacterEyes({ scrollData }) {
  const leftEyeGroup = useRef();
  const rightEyeGroup = useRef();
  const leftPupil = useRef();
  const rightPupil = useRef();
  const leftEyelid = useRef();
  const rightEyelid = useRef();
  
  const mouse = useMousePosition();
  const [blinkActive, setBlinkActive] = useState(false);
  const nextBlink = useRef(0);

  // Material for the sclera (white part)
  const scleraMaterial = new THREE.MeshStandardMaterial({
    color: '#e5e5e5',
    roughness: 0.1,
    metalness: 0.1,
  });

  // Material for the pupil/iris
  const pupilMaterial = new THREE.MeshStandardMaterial({
    color: '#050505',
    roughness: 0.05,
    metalness: 0.8,
  });

  // Eyelid material matches the shell/mask
  const eyelidMaterial = new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.4,
    metalness: 0.6,
  });

  useFrame((state, delta) => {
    // Scroll progress from 0 to 1
    const progress = scrollData.current;
    
    // Normal: 1, Crazy: 1.5, Mask: 0.4
    let eyeStrength = 1;
    if (progress > 0.25 && progress <= 0.70) {
      // Transitioning to crazy, increase strength
      const crazyProgress = (progress - 0.25) / 0.45;
      eyeStrength = 1 + crazyProgress * 0.5;
    } else if (progress > 0.70) {
      // Transitioning to mask, decrease strength
      const maskProgress = (progress - 0.70) / 0.30;
      eyeStrength = 1.5 - maskProgress * 1.1; // down to 0.4
    }

    // Move pupils toward mouse
    const targetX = mouse.x * eyeStrength;
    const targetY = mouse.y * eyeStrength;

    // Subtle eye group rotation (the whole eyeball)
    const rotX = mouse.y * 0.2 * eyeStrength;
    const rotY = mouse.x * 0.3 * eyeStrength;

    [leftEyeGroup, rightEyeGroup].forEach((eye) => {
      if (eye.current) {
        eye.current.rotation.x += (rotX - eye.current.rotation.x) * 0.08;
        eye.current.rotation.y += (rotY - eye.current.rotation.y) * 0.08;
      }
    });

    [leftPupil, rightPupil].forEach((pupil) => {
      if (pupil.current) {
        // Range limits to keep pupil on eyeball
        const maxMove = 0.12; 
        const pX = Math.max(-maxMove, Math.min(maxMove, targetX * 0.15));
        const pY = Math.max(-maxMove, Math.min(maxMove, targetY * 0.15));
        
        pupil.current.position.x += (pX - pupil.current.position.x) * 0.1;
        pupil.current.position.y += (pY - pupil.current.position.y) * 0.1;
      }
    });

    // Blinking logic
    if (state.clock.elapsedTime > nextBlink.current) {
      setBlinkActive(true);
      // Next blink between 2.5 and 5 seconds
      nextBlink.current = state.clock.elapsedTime + 2.5 + Math.random() * 2.5;
      
      // Stop blinking after 150ms
      setTimeout(() => setBlinkActive(false), 150);
    }

    // Animate eyelid for blinking and crazy states
    let targetEyelidY = blinkActive ? 0 : 0.2;
    
    // In crazy state (progress 0.5 to 0.7), eyes widen (eyelids go further up)
    if (progress > 0.5 && progress <= 0.7) {
      const wideProgress = (progress - 0.5) / 0.2;
      targetEyelidY = blinkActive ? 0 : 0.2 + wideProgress * 0.15;
    }
    
    // When mask is forming (>0.7), eyelids return to neutral
    if (progress > 0.7) {
      const maskProgress = (progress - 0.7) / 0.3;
      targetEyelidY = blinkActive ? 0 : 0.2 - maskProgress * 0.05;
    }

    [leftEyelid, rightEyelid].forEach((lid) => {
      if (lid.current) {
        lid.current.position.y += (targetEyelidY - lid.current.position.y) * 0.3;
      }
    });
    
    // Asymmetry in crazy state: Left eye gets slightly larger, right eye squints
    let scaleLeftY = 1;
    let scaleRightY = 1;
    if (progress > 0.5 && progress <= 0.75) {
      const asymProgress = (progress - 0.5) / 0.25;
      scaleLeftY = 1 + asymProgress * 0.2;
      scaleRightY = 1 - asymProgress * 0.1;
    }
    
    if (leftEyeGroup.current) leftEyeGroup.current.scale.set(1, scaleLeftY, 1);
    if (rightEyeGroup.current) rightEyeGroup.current.scale.set(1, scaleRightY, 1);
  });

  return (
    <>
      {/* Left Eye */}
      <group position={[-0.35, 0.2, 0.65]} ref={leftEyeGroup}>
        {/* Eyeball */}
        <mesh material={scleraMaterial}>
          <sphereGeometry args={[0.15, 32, 32]} />
        </mesh>
        {/* Pupil */}
        <mesh ref={leftPupil} position={[0, 0, 0.13]} material={pupilMaterial}>
          <sphereGeometry args={[0.06, 32, 32]} />
        </mesh>
        {/* Eyelid (Upper) */}
        <mesh ref={leftEyelid} position={[0, 0.2, 0.05]} material={eyelidMaterial}>
          <sphereGeometry args={[0.18, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Right Eye */}
      <group position={[0.35, 0.2, 0.65]} ref={rightEyeGroup}>
        {/* Eyeball */}
        <mesh material={scleraMaterial}>
          <sphereGeometry args={[0.15, 32, 32]} />
        </mesh>
        {/* Pupil */}
        <mesh ref={rightPupil} position={[0, 0, 0.13]} material={pupilMaterial}>
          <sphereGeometry args={[0.06, 32, 32]} />
        </mesh>
        {/* Eyelid (Upper) */}
        <mesh ref={rightEyelid} position={[0, 0.2, 0.05]} material={eyelidMaterial}>
          <sphereGeometry args={[0.18, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>
    </>
  );
}
