import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const HeroObject = () => {
    const meshRef = useRef(null);
    const { activeWorld, scrollProgress, scrollVelocity, quality, reducedMotion } = useStore();
    
    // Target values for smooth interpolation
    const target = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        
        // Only active in hero or about (for the transition out)
        if (activeWorld !== 'hero' && activeWorld !== 'about') {
            meshRef.current.visible = false;
            return;
        } else {
            meshRef.current.visible = true;
        }

        // Dissolve transition
        const targetOpacity = activeWorld === 'hero' ? 1 : 0;
        const targetScaleMultiplier = activeWorld === 'hero' ? 1 : 0.01;
        
        meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity || 1, targetOpacity, 0.05);
        meshRef.current.material.transparent = true;

        // Mouse physics (springy, physical feel)
        if (!reducedMotion) {
            target.current.x = state.pointer.x * 0.5;
            target.current.y = state.pointer.y * 0.5;
            
            meshRef.current.rotation.x += (target.current.y - meshRef.current.rotation.x) * delta * 2;
            meshRef.current.rotation.y += (target.current.x - meshRef.current.rotation.y) * delta * 2;
        }

        // Scroll influence (distortion and scale)
        const scaleBase = 1.6;
        const scaleScroll = scrollProgress * 2; // gets bigger or smaller as we scroll away
        const targetScale = (scaleBase + scaleScroll) * targetScaleMultiplier;
        
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
        
        // Spin slightly on fast scroll
        if (!reducedMotion) {
            meshRef.current.rotation.z += scrollVelocity * 0.005;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1, quality === 'mobile' || quality === 'low' ? 32 : 64]} />
                <MeshDistortMaterial
                    color="#050505"
                    emissive="#1a2b00"
                    emissiveIntensity={0.8}
                    roughness={0.1}
                    metalness={0.9}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    distort={reducedMotion ? 0.1 : 0.4}
                    speed={reducedMotion ? 0.5 : 1.5}
                    envMapIntensity={1}
                />
            </mesh>
            {/* Subtle inner core for the 'acid-green internal light' */}
            <mesh scale={0.8}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#ccff00" transparent opacity={0.1} />
            </mesh>
        </group>
    );
};
