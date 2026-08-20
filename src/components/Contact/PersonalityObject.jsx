import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const PersonalityObject = () => {
    const meshRef = useRef(null);
    const { activeWorld, scrollVelocity, quality, reducedMotion } = useStore();

    // Create a complex wavy geometry based on quality
    const segments = quality === 'mobile' || quality === 'low' ? 32 : 64;
    const geometry = useMemo(() => new THREE.PlaneGeometry(15, 10, segments, segments), [segments]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        
        if (activeWorld !== 'personality') {
            meshRef.current.visible = false;
            return;
        } else {
            meshRef.current.visible = true;
        }

        // Deform the plane to look like liquid/distorted mirror
        const positions = meshRef.current.geometry.attributes.position;
        const time = state.clock.elapsedTime * (reducedMotion ? 0.2 : 1);
        
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            
            // Complex wave function influenced by time and scroll velocity
            const z = Math.sin(x * 1 + time) * 0.5 
                    + Math.cos(y * 1.5 + time * 0.8) * 0.5
                    + (reducedMotion ? 0 : Math.sin((x + y) * 2 + time * 2 + (scrollVelocity * 0.05)) * 0.2);
                    
            positions.setZ(i, z);
        }
        
        positions.needsUpdate = true;

        // Slight rotation based on mouse
        if (!reducedMotion) {
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -state.pointer.y * 0.2 - 0.2, 0.05);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.pointer.x * 0.2, 0.05);
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} position={[0, 0, -2]}>
            <meshPhysicalMaterial 
                color="#000000" 
                roughness={0.1}
                metalness={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                wireframe={false}
            />
            {/* Ambient reflection color from the blue theme */}
            <pointLight position={[0, 0, 2]} intensity={2} color="#00aaff" />
            <pointLight position={[5, 5, 2]} intensity={1} color="#0000ff" />
        </mesh>
    );
};
