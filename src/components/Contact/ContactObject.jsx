import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const ContactObject = () => {
    const groupRef = useRef(null);
    const diskRef = useRef(null);
    const { activeWorld, scrollVelocity, quality, reducedMotion } = useStore();

    // Accretion disk particles based on quality
    const particlesCount = quality === 'mobile' || quality === 'low' ? 500 : quality === 'medium' ? 1000 : 2000;
    const particles = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const color = new THREE.Color();
        
        for (let i = 0; i < particlesCount; i++) {
            // Distribute particles in a disk shape, denser in the middle, empty in the very center
            const radius = 1.5 + Math.random() * 4;
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 0.2 * (6 - radius); // Thicker near the center
            
            positions[i * 3] = Math.cos(theta) * radius;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(theta) * radius;
            
            // Color gradient from orange to red
            color.setHSL(0.1 * (radius - 1.5)/4, 1.0, 0.5);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return { positions, colors };
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        if (activeWorld !== 'contact') {
            groupRef.current.visible = false;
            return;
        } else {
            groupRef.current.visible = true;
        }

        // Rapidly rotate the accretion disk
        if (diskRef.current) {
            diskRef.current.rotation.y -= delta * (reducedMotion ? 0.1 : 0.5) + (reducedMotion ? 0 : scrollVelocity * 0.001);
        }

        // Tilt based on mouse
        if (!reducedMotion) {
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.5 - state.pointer.y * 0.3, 0.05);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, state.pointer.x * 0.2, 0.05);
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, -3]}>
            {/* The Black Hole (Event Horizon) */}
            <mesh>
                <sphereGeometry args={[1.4, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Glowing ring right outside event horizon */}
            <mesh rotation={[Math.PI/2, 0, 0]}>
                <torusGeometry args={[1.5, 0.1, 16, 100]} />
                <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} />
            </mesh>

            {/* Accretion Disk Particles */}
            <points ref={diskRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={particlesCount} array={particles.positions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={particlesCount} array={particles.colors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial 
                    size={0.03} 
                    vertexColors 
                    transparent 
                    opacity={0.6} 
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </group>
    );
};
