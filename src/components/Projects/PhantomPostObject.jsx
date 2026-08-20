import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const PhantomPostObject = () => {
    const groupRef = useRef(null);
    const headRef = useRef(null);
    const particlesRef = useRef(null);
    const { activeWorld, scrollProgress, scrollVelocity, quality, reducedMotion } = useStore();

    // Procedural silhouette geometry
    const particleCount = quality === 'mobile' || quality === 'low' ? 300 : quality === 'medium' ? 600 : 1000;
    const positions = useMemo(() => {
        const arr = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            // Rough head and shoulders distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            // Shoulders vs Head
            const isHead = Math.random() > 0.6;
            
            if (isHead) {
                // Sphere-ish for head
                const r = 0.8 + (Math.random() * 0.2);
                arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                arr[i * 3 + 1] = r * Math.cos(phi) + 1.2; // shifted up
                arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
            } else {
                // Cylinder/Cone-ish for shoulders
                const r = 1.5 + (Math.random() * 0.5);
                const y = -1.5 + Math.random() * 2; // from -1.5 to 0.5
                // make it wider at bottom
                const widthFactor = 1 - (y + 1.5) / 2;
                
                arr[i * 3] = r * Math.cos(theta) * widthFactor * 1.5;
                arr[i * 3 + 1] = y;
                arr[i * 3 + 2] = r * Math.sin(theta) * widthFactor * 0.5; // flatter depth
            }
        }
        return arr;
    }, [particleCount]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        if (activeWorld !== 'phantompost') {
            groupRef.current.visible = false;
            return;
        } else {
            groupRef.current.visible = true;
        }

        // Slight breathing animation
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * (reducedMotion ? 0.1 : 0.5)) * 0.1 - 0.5;
        
        // Follow mouse slightly
        if (!reducedMotion) {
            groupRef.current.rotation.y += (state.pointer.x * 0.5 - groupRef.current.rotation.y) * delta * 2;
            groupRef.current.rotation.x += (-state.pointer.y * 0.2 - groupRef.current.rotation.x) * delta * 2;
        }

        if (particlesRef.current && !reducedMotion) {
            particlesRef.current.rotation.y += scrollVelocity * 0.005;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            {/* Deep purple lighting specific to this world */}
            <pointLight position={[0, 2, 2]} intensity={2} color="#9333ea" />
            <pointLight position={[-2, -1, 1]} intensity={1} color="#4c1d95" />

            {/* Silhouette Core (Glassy dark material) */}
            <mesh ref={headRef} position={[0, 1.2, 0]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshPhysicalMaterial 
                    color="#0a0014" 
                    roughness={0.2} 
                    metalness={0.8} 
                    clearcoat={1} 
                    transmission={0.5} 
                    thickness={0.5} 
                />
            </mesh>
            
            <mesh position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.5, 1.8, 2, 32]} />
                <meshPhysicalMaterial 
                    color="#0a0014" 
                    roughness={0.3} 
                    metalness={0.7} 
                />
            </mesh>

            {/* Particle Cloud forming the abstract outer shape */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial 
                    size={0.03} 
                    color="#d8b4fe" 
                    transparent 
                    opacity={0.6} 
                    blending={THREE.AdditiveBlending} 
                    depthWrite={false}
                />
            </points>

            {/* Orbiting message fragments (abstract planes) */}
            {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[
                    Math.cos((i / 5) * Math.PI * 2) * 3,
                    Math.sin((i / 5) * Math.PI * 2) * 2 + Math.random(),
                    Math.sin((i / 5) * Math.PI * 2) * 3
                ]} rotation={[Math.random(), Math.random(), 0]}>
                    <planeGeometry args={[0.8, 0.3]} />
                    <meshBasicMaterial color="#9333ea" transparent opacity={0.3} side={THREE.DoubleSide} wireframe />
                </mesh>
            ))}
        </group>
    );
};
