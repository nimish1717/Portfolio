import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const SkillsObject = () => {
    const groupRef = useRef(null);
    const meshRef = useRef(null);
    const { activeWorld, activeSkillCategory, scrollVelocity } = useStore();

    // Map categories to geometries
    const geometries = useMemo(() => {
        return {
            'FRONTEND': new THREE.TorusKnotGeometry(1.5, 0.4, 128, 32),
            'BACKEND': new THREE.BoxGeometry(3, 3, 3, 4, 4, 4),
            'AI / ML': new THREE.IcosahedronGeometry(2, 2),
            'DESIGN': new THREE.TorusGeometry(2, 0.5, 16, 100),
            'MOTION': new THREE.CylinderGeometry(1, 2, 4, 32, 10, true)
        };
    }, []);

    const targetGeometry = geometries[activeSkillCategory] || geometries['FRONTEND'];

    useFrame((state, delta) => {
        if (!groupRef.current || !meshRef.current) return;
        
        if (activeWorld !== 'skills') {
            groupRef.current.visible = false;
            return;
        } else {
            groupRef.current.visible = true;
        }

        // Rotate based on scroll velocity and time
        meshRef.current.rotation.y += delta * 0.2 + (scrollVelocity * 0.001);
        meshRef.current.rotation.x += delta * 0.1;
        
        // Slight mouse follow
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.2, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.2, 0.05);
        
        // Animate scale pulse
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        meshRef.current.scale.set(scale, scale, scale);
    });

    return (
        <group ref={groupRef} position={[0, 0, -2]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#ccff00" />
            
            <mesh ref={meshRef} geometry={targetGeometry}>
                <meshBasicMaterial 
                    color="#ccff00" 
                    wireframe 
                    transparent 
                    opacity={0.15} 
                    side={THREE.DoubleSide}
                />
            </mesh>
            
            {/* Inner solid core */}
            <mesh geometry={targetGeometry} scale={0.98}>
                <meshPhysicalMaterial 
                    color="#050505" 
                    roughness={0.8}
                    metalness={0.2}
                />
            </mesh>
        </group>
    );
};
