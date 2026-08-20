import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const FraudDetectionObject = () => {
    const groupRef = useRef(null);
    const normalParticlesRef = useRef(null);
    const fraudParticlesRef = useRef(null);
    const { activeWorld, scrollProgress, scrollVelocity, quality } = useStore();

    const particleCount = quality === 'low' || quality === 'mobile' ? 500 : 2000;
    
    // Normal transactions (stable circular/cylindrical paths)
    const normalPositions = useMemo(() => {
        const arr = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const radius = 2 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 4;
            
            arr[i * 3] = radius * Math.cos(theta);
            arr[i * 3 + 1] = y;
            arr[i * 3 + 2] = radius * Math.sin(theta);
        }
        return arr;
    }, [particleCount]);

    // Fraud transactions (chaotic, breaking out of the pattern)
    const fraudCount = Math.floor(particleCount * 0.05); // 5% anomalies
    const fraudPositions = useMemo(() => {
        const arr = new Float32Array(fraudCount * 3);
        for (let i = 0; i < fraudCount; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 8;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        return arr;
    }, [fraudCount]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        if (activeWorld !== 'fraud') {
            groupRef.current.visible = false;
            return;
        } else {
            groupRef.current.visible = true;
        }

        // Normal network rotates smoothly
        if (normalParticlesRef.current) {
            normalParticlesRef.current.rotation.y += delta * 0.1 + (scrollVelocity * 0.001);
            normalParticlesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }

        // Fraud particles move erratically
        if (fraudParticlesRef.current) {
            const positions = fraudParticlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < fraudCount; i++) {
                // jitter
                positions[i * 3] += (Math.random() - 0.5) * 0.05;
                positions[i * 3 + 1] += (Math.random() - 0.5) * 0.05;
                positions[i * 3 + 2] += (Math.random() - 0.5) * 0.05;
                
                // keep them contained
                if (Math.abs(positions[i*3]) > 4) positions[i*3] *= -0.9;
                if (Math.abs(positions[i*3+1]) > 4) positions[i*3+1] *= -0.9;
                if (Math.abs(positions[i*3+2]) > 4) positions[i*3+2] *= -0.9;
            }
            fraudParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Interactive tilt
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.pointer.y * 0.2, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.2, 0.05);
    });

    return (
        <group ref={groupRef}>
            <pointLight position={[0, 0, 0]} intensity={2} color="#00ff00" />
            
            {/* Normal Network */}
            <points ref={normalParticlesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={particleCount} array={normalPositions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial 
                    size={0.015} 
                    color="#003300" 
                    transparent 
                    opacity={0.8} 
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Fraud Anomalies */}
            <points ref={fraudParticlesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={fraudCount} array={fraudPositions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial 
                    size={0.05} 
                    color="#ccff00" 
                    transparent 
                    opacity={1} 
                    blending={THREE.AdditiveBlending}
                />
            </points>
            
            {/* Abstract core representing the Model */}
            <mesh scale={0.5}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#ccff00" wireframe transparent opacity={0.3} />
            </mesh>
        </group>
    );
};
