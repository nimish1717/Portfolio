import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const DigitalLabObject = () => {
    const groupRef = useRef(null);
    const { activeWorld, scrollVelocity } = useStore();

    // Generate random positions for floating units
    const units = useMemo(() => {
        return [...Array(6)].map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 3 - 2
            ],
            speed: Math.random() * 0.5 + 0.2,
            offset: Math.random() * Math.PI * 2
        }));
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        if (activeWorld !== 'lab') {
            groupRef.current.visible = false;
            return;
        } else {
            groupRef.current.visible = true;
        }

        // Slight rotation to the whole group based on mouse
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.1, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.1, 0.05);
        
        // Z-rotation from scroll
        groupRef.current.rotation.z += scrollVelocity * 0.0005;

        // Animate individual units
        groupRef.current.children.forEach((child, i) => {
            if (child.type === 'Group') {
                const unit = units[i];
                if (unit) {
                    child.position.y += Math.sin(state.clock.elapsedTime * unit.speed + unit.offset) * 0.01;
                    child.rotation.x += delta * 0.1;
                    child.rotation.y += delta * 0.2;
                }
            }
        });
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: '#00ffcc',
        transmission: 0.9,
        opacity: 1,
        metalness: 0,
        roughness: 0,
        ior: 1.5,
        thickness: 0.5,
        specularIntensity: 1,
        transparent: true,
        side: THREE.DoubleSide
    });

    const coreMaterial = new THREE.MeshBasicMaterial({
        color: '#00ffcc',
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 2]} intensity={2} color="#00ffcc" />

            {units.map((unit, i) => (
                <group key={i} position={unit.position}>
                    {/* Outer glass containment */}
                    <mesh material={glassMaterial}>
                        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
                    </mesh>
                    
                    {/* Inner wireframe core (the "experiment") */}
                    <mesh material={coreMaterial} scale={0.7} rotation={[Math.random(), Math.random(), 0]}>
                        <icosahedronGeometry args={[0.4, 1]} />
                    </mesh>

                    {/* End caps */}
                    <mesh position={[0, 1.05, 0]} material={coreMaterial}>
                        <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
                    </mesh>
                    <mesh position={[0, -1.05, 0]} material={coreMaterial}>
                        <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};
