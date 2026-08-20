import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const AboutObject = () => {
    const meshRef = useRef(null);
    const { activeWorld, scrollVelocity } = useStore();

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        
        // Only active in hero, about, marquee (for transitions)
        if (activeWorld !== 'hero' && activeWorld !== 'about' && activeWorld !== 'marquee') {
            meshRef.current.visible = false;
            return;
        } else {
            meshRef.current.visible = true;
        }

        const targetOpacity = activeWorld === 'about' ? 0.3 : 0;
        
        // Apply opacity to children materials
        meshRef.current.children.forEach(child => {
            if (child.material) {
                child.material.opacity = THREE.MathUtils.lerp(child.material.opacity || 0, targetOpacity, 0.05);
            }
        });

        // Rotation reacts to scroll velocity
        meshRef.current.rotation.y += delta * 0.05 + (scrollVelocity * 0.001);
        meshRef.current.rotation.x += delta * 0.02;
    });

    return (
        <group ref={meshRef} position={[0, 0, -2]} scale={3}>
            {/* Outer wireframe sphere */}
            <mesh>
                <icosahedronGeometry args={[2, 2]} />
                <meshBasicMaterial 
                    color="#ffffff" 
                    wireframe 
                    transparent 
                    opacity={0} 
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Inner slightly distorted wireframe */}
            <mesh scale={0.8} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[1.5, 0.5, 8, 20]} />
                <meshBasicMaterial 
                    color="#aaaaaa" 
                    wireframe 
                    transparent 
                    opacity={0} 
                />
            </mesh>
        </group>
    );
};
