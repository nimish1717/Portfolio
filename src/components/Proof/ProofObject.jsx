import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const ProofObject = () => {
    const groupRef = useRef(null);
    const coreRef = useRef(null);
    const { activeWorld, scrollVelocity } = useStore();

    // Data fragments orbiting the core
    const fragmentsCount = 50;
    const fragments = useMemo(() => {
        return [...Array(fragmentsCount)].map(() => ({
            position: [
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            ],
            speed: Math.random() * 0.02 + 0.01,
            axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize()
        }));
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        if (activeWorld !== 'proof') {
            groupRef.current.visible = false;
            return;
        } else {
            groupRef.current.visible = true;
        }

        // Pulse the core
        if (coreRef.current) {
            const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
            coreRef.current.scale.set(scale, scale, scale);
            coreRef.current.rotation.y += delta * 0.5 + (scrollVelocity * 0.001);
            coreRef.current.rotation.x += delta * 0.2;
        }

        // Rotate the entire fragment system slightly based on mouse
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.3, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.3, 0.05);
        
        // Rotate fragments based on scroll
        groupRef.current.rotation.z += scrollVelocity * 0.0005;
    });

    return (
        <group ref={groupRef} position={[0, 0, -1]}>
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 0]} intensity={3} color="#ff3366" />
            
            {/* Glowing Core */}
            <mesh ref={coreRef}>
                <octahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial 
                    color="#000000" 
                    emissive="#ff3366"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={0.9}
                    clearcoat={1}
                />
            </mesh>

            {/* Core wireframe outer shell */}
            <mesh scale={1.1}>
                <octahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#ff3366" wireframe transparent opacity={0.3} />
            </mesh>

            {/* Orbiting data fragments */}
            {fragments.map((frag, i) => (
                <mesh key={i} position={frag.position}>
                    <boxGeometry args={[0.05, 0.05, 0.1]} />
                    <meshBasicMaterial color="#ff3366" transparent opacity={0.6} />
                </mesh>
            ))}
        </group>
    );
};
