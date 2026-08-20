import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const CurrentlyBuildingObject = () => {
    const groupRef = useRef(null);
    const scaffoldRef = useRef(null);
    const { activeWorld, scrollVelocity } = useStore();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        if (activeWorld !== 'building') {
            groupRef.current.visible = false;
            return;
        } else {
            groupRef.current.visible = true;
        }

        // Slowly rotate the entire construction site
        groupRef.current.rotation.y += delta * 0.05 + (scrollVelocity * 0.0005);
        
        // Jitter the scaffold slightly to feel unstable/under construction
        if (scaffoldRef.current) {
            scaffoldRef.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.02;
            scaffoldRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 8) * 0.01;
        }
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: '#00ff00',
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    return (
        <group ref={groupRef} position={[0, -1, -2]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 2, 0]} intensity={1} color="#00ff00" />
            
            <group ref={scaffoldRef}>
                {/* Central unfinished core */}
                <mesh position={[0, 1, 0]}>
                    <cylinderGeometry args={[1, 1, 4, 8, 4, true]} />
                    <meshBasicMaterial color="#00ff00" wireframe transparent opacity={0.5} />
                </mesh>

                {/* Scaffolding rings */}
                {[...Array(4)].map((_, i) => (
                    <mesh key={i} position={[0, i * 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1.5, 0.05, 8, 24]} />
                        <primitive object={wireframeMaterial} attach="material" />
                    </mesh>
                ))}

                {/* Scaffolding beams */}
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[
                        Math.cos((i / 8) * Math.PI * 2) * 1.5,
                        1.5,
                        Math.sin((i / 8) * Math.PI * 2) * 1.5
                    ]}>
                        <boxGeometry args={[0.05, 4, 0.05]} />
                        <primitive object={wireframeMaterial} attach="material" />
                    </mesh>
                ))}
            </group>
        </group>
    );
};
