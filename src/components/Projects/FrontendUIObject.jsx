import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { Text } from '@react-three/drei';

export const FrontendUIObject = () => {
    const groupRef = useRef(null);
    const window1Ref = useRef(null);
    const window2Ref = useRef(null);
    const window3Ref = useRef(null);
    const { activeWorld, scrollProgress, scrollVelocity, reducedMotion } = useStore();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        if (activeWorld !== 'frontend') {
            groupRef.current.visible = false;
            return;
        } else {
            groupRef.current.visible = true;
        }

        // Floating motion
        const time = state.clock.elapsedTime * (reducedMotion ? 0.2 : 1);
        
        if (window1Ref.current) {
            window1Ref.current.position.y = Math.sin(time * 0.5) * 0.2;
            if (!reducedMotion) {
                window1Ref.current.rotation.y = THREE.MathUtils.lerp(window1Ref.current.rotation.y, state.pointer.x * 0.3 - 0.2, 0.05);
                window1Ref.current.rotation.x = THREE.MathUtils.lerp(window1Ref.current.rotation.x, -state.pointer.y * 0.3, 0.05);
            }
        }
        
        if (window2Ref.current) {
            window2Ref.current.position.y = Math.cos(time * 0.4) * 0.3 + 1;
            if (!reducedMotion) {
                window2Ref.current.rotation.y = THREE.MathUtils.lerp(window2Ref.current.rotation.y, state.pointer.x * 0.4 + 0.3, 0.05);
                window2Ref.current.rotation.x = THREE.MathUtils.lerp(window2Ref.current.rotation.x, -state.pointer.y * 0.4 + 0.1, 0.05);
            }
        }

        if (window3Ref.current) {
            window3Ref.current.position.y = Math.sin(time * 0.6) * 0.2 - 1.5;
            if (!reducedMotion) {
                window3Ref.current.rotation.y = THREE.MathUtils.lerp(window3Ref.current.rotation.y, state.pointer.x * 0.2 - 0.5, 0.05);
                window3Ref.current.rotation.x = THREE.MathUtils.lerp(window3Ref.current.rotation.x, -state.pointer.y * 0.2 - 0.1, 0.05);
            }
        }

        // Group reacts to scroll velocity
        if (!reducedMotion) {
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, scrollVelocity * 0.002, 0.05);
        }
    });

    const windowMaterial = new THREE.MeshPhysicalMaterial({
        color: '#0a0a0a',
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: '#60a5fa', // blue-400
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 2, 2]} intensity={1} color="#60a5fa" />

            {/* Window 1 */}
            <group ref={window1Ref} position={[-2, 0, -1]}>
                <mesh material={windowMaterial}>
                    <planeGeometry args={[3, 2]} />
                </mesh>
                <mesh material={wireframeMaterial} position={[0, 0, 0.01]}>
                    <planeGeometry args={[2.8, 1.8]} />
                </mesh>
                <mesh material={wireframeMaterial} position={[-0.8, 0, 0.2]}>
                    <planeGeometry args={[0.8, 1.2]} />
                </mesh>
                <Text position={[0.2, 0, 0.3]} fontSize={0.2} color="#60a5fa" anchorX="center" anchorY="middle">
                    &lt;Component /&gt;
                </Text>
            </group>

            {/* Window 2 */}
            <group ref={window2Ref} position={[2, 1, -2]}>
                <mesh material={windowMaterial}>
                    <planeGeometry args={[2.5, 3.5]} />
                </mesh>
                <mesh material={wireframeMaterial} position={[0, 0, 0.01]}>
                    <planeGeometry args={[2.3, 3.3]} />
                </mesh>
                <mesh material={wireframeMaterial} position={[0, 1, 0.2]}>
                    <planeGeometry args={[2, 0.5]} />
                </mesh>
                <mesh material={wireframeMaterial} position={[0, 0, 0.4]}>
                    <planeGeometry args={[2, 0.5]} />
                </mesh>
                <Text position={[0, -1, 0.3]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
                    STATE: MOUNTED
                </Text>
            </group>

            {/* Window 3 */}
            <group ref={window3Ref} position={[1.5, -1.5, 0]}>
                <mesh material={windowMaterial}>
                    <planeGeometry args={[4, 1.5]} />
                </mesh>
                <mesh material={wireframeMaterial} position={[0, 0, 0.01]}>
                    <planeGeometry args={[3.8, 1.3]} />
                </mesh>
                <mesh material={wireframeMaterial} position={[-1, 0, 0.3]}>
                    <boxGeometry args={[1, 0.8, 0.1]} />
                </mesh>
                <mesh material={wireframeMaterial} position={[0.5, 0, 0.5]}>
                    <boxGeometry args={[1.5, 0.8, 0.1]} />
                </mesh>
            </group>
        </group>
    );
};
