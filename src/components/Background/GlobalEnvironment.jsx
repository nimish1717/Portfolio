import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { HeroObject } from '../Hero/HeroObject';
import { AboutObject } from '../About/AboutObject';
import { PhantomPostObject } from '../Projects/PhantomPostObject';
import { FraudDetectionObject } from '../Projects/FraudDetectionObject';
import { FrontendUIObject } from '../Projects/FrontendUIObject';
import { SkillsObject } from '../Skills/SkillsObject';
import { CurrentlyBuildingObject } from '../CurrentlyBuilding/CurrentlyBuildingObject';
import { DigitalLabObject } from '../DigitalLab/DigitalLabObject';
import { ProofObject } from '../Proof/ProofObject';
import { PersonalityObject } from '../Contact/PersonalityObject';
import { ContactObject } from '../Contact/ContactObject';

const BackgroundParticles = () => {
    const pointsRef = useRef(null);
    const { activeWorld, scrollVelocity, quality, reducedMotion } = useStore();

    // Reduce particles based on quality
    const particleCount = quality === 'low' || quality === 'mobile' ? 300 : 
                          quality === 'medium' ? 800 : 1500;
                          
    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.001 + (reducedMotion ? 0 : scrollVelocity * 0.0001);
            
            // Adjust particle color based on active world
            let targetHex = '#888888';
            if (activeWorld === 'hero') targetHex = '#ccff00';
            else if (activeWorld === 'phantompost') targetHex = '#9333ea';
            else if (activeWorld === 'fraud') targetHex = '#00ff00';
            else if (activeWorld === 'frontend') targetHex = '#60a5fa';
            else if (activeWorld === 'skills') targetHex = '#ccff00';
            else if (activeWorld === 'building') targetHex = '#00ff00';
            else if (activeWorld === 'lab') targetHex = '#00ffcc';
            else if (activeWorld === 'proof') targetHex = '#ff3366';
            else if (activeWorld === 'personality') targetHex = '#00aaff';
            else if (activeWorld === 'contact') targetHex = '#ffaa00';

            const targetColor = new THREE.Color(targetHex);
            pointsRef.current.material.color.lerp(targetColor, 0.05);
        }
    });

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#ccff00" transparent opacity={0.3} depthWrite={false} />
        </points>
    );
};

export const GlobalEnvironment = () => {
    const [dpr, setDpr] = useState([1, 1.5]);
    const setQuality = useStore((state) => state.setQuality);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                dpr={dpr}
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            >
                <PerformanceMonitor 
                    onIncline={() => {
                        setDpr([1, 1.5]);
                        setQuality('high');
                    }}
                    onDecline={() => {
                        setDpr([0.5, 1]);
                        setQuality('low');
                    }}
                    flipflops={3}
                    onFallback={() => setQuality('mobile')}
                >
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[5, 5, 5]} intensity={0.5} />
                    <HeroObject />
                    <AboutObject />
                    <PhantomPostObject />
                    <FraudDetectionObject />
                    <FrontendUIObject />
                    <SkillsObject />
                    <CurrentlyBuildingObject />
                    <DigitalLabObject />
                    <ProofObject />
                    <PersonalityObject />
                    <ContactObject />
                    <BackgroundParticles />
                </PerformanceMonitor>
            </Canvas>
        </div>
    );
};
