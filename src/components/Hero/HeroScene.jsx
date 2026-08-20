import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Floating particles (lightweight points) ── */
const Particles = ({ count = 150 }) => {
    const ref = useRef(null);
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 14;
        return arr;
    }, [count]);

    useFrame((s) => {
        if (ref.current) {
            ref.current.rotation.y = s.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#ccff00" size={0.025} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
        </points>
    );
};

/* ── Orbital ring (torus with wireframe) ── */
const OrbitalRing = ({ radius = 2, tilt = [0, 0, 0], opacity = 0.15, speed = 0.05 }) => {
    const ref = useRef(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.z += delta * speed;
        }
    });

    return (
        <mesh ref={ref} rotation={tilt}>
            <torusGeometry args={[radius, 0.005, 8, 100]} />
            <meshBasicMaterial color="#ccff00" transparent opacity={opacity} />
        </mesh>
    );
};

/* ── Small glowing dot on orbit ── */
const OrbitDot = ({ radius, angle, tilt, size = 0.04 }) => {
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    return (
        <mesh position={[x, 0, z]} rotation={tilt}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshBasicMaterial color="#ccff00" transparent opacity={0.8} />
        </mesh>
    );
};

/* ── Main dark globe with orbital rings ── */
const DarkGlobe = () => {
    const groupRef = useRef(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.06;

            // Subtle mouse reactivity
            const mx = state.pointer.x * 0.15;
            const my = state.pointer.y * 0.1;
            groupRef.current.rotation.y += mx * 0.01;
            groupRef.current.rotation.x += (my * 0.3 - groupRef.current.rotation.x) * 0.02;
        }
    });

    const ring1Tilt = [Math.PI * 0.45, 0, 0.2];
    const ring2Tilt = [Math.PI * 0.35, 0.3, -0.1];
    const ring3Tilt = [Math.PI * 0.55, -0.2, 0.4];

    return (
        <group ref={groupRef} scale={1.6}>
            {/* Dark solid sphere core */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#050505"
                    roughness={0.15}
                    metalness={0.95}
                />
            </mesh>

            {/* Subtle green wireframe shell */}
            <mesh>
                <sphereGeometry args={[1.02, 16, 16]} />
                <meshBasicMaterial color="#ccff00" wireframe transparent opacity={0.06} />
            </mesh>

            {/* Orbital rings at different tilts */}
            <OrbitalRing radius={1.8} tilt={ring1Tilt} opacity={0.2} speed={0.04} />
            <OrbitalRing radius={2.3} tilt={ring2Tilt} opacity={0.12} speed={-0.03} />
            <OrbitalRing radius={2.8} tilt={ring3Tilt} opacity={0.08} speed={0.02} />

            {/* Glowing dots on orbits */}
            <group rotation={ring1Tilt}>
                <OrbitDot radius={1.8} angle={0.5} tilt={[0,0,0]} size={0.05} />
                <OrbitDot radius={1.8} angle={2.8} tilt={[0,0,0]} size={0.035} />
                <OrbitDot radius={1.8} angle={4.5} tilt={[0,0,0]} size={0.04} />
            </group>
            <group rotation={ring2Tilt}>
                <OrbitDot radius={2.3} angle={1.2} tilt={[0,0,0]} size={0.045} />
                <OrbitDot radius={2.3} angle={3.8} tilt={[0,0,0]} size={0.035} />
            </group>
            <group rotation={ring3Tilt}>
                <OrbitDot radius={2.8} angle={0.8} tilt={[0,0,0]} size={0.04} />
                <OrbitDot radius={2.8} angle={5.0} tilt={[0,0,0]} size={0.03} />
            </group>

            {/* Inner glow */}
            <mesh>
                <sphereGeometry args={[0.5, 12, 12]} />
                <meshBasicMaterial color="#1a2800" transparent opacity={0.2} />
            </mesh>
        </group>
    );
};

export const HeroScene = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 7], fov: 40 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#ccff00" />
            <DarkGlobe />
            <Particles />
        </Canvas>
    );
};
