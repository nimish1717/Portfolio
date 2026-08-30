"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment, ScrollControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { useExperienceStore, EXPERIENCE_STATES } from "@/store/useExperienceStore";
import { CameraSystem } from "@/systems/CameraSystem";
import { Stadium } from "@/scenes/Stadium";
import { Tunnel } from "@/scenes/Tunnel";
import { LockerRoom } from "@/scenes/LockerRoom";
import { TrainingGround } from "@/scenes/TrainingGround";
import { Skills } from "@/scenes/Skills";
import { TrophyRoom } from "@/scenes/TrophyRoom";
import { MatchTimeline } from "@/scenes/MatchTimeline";
import { Penalty } from "@/scenes/Penalty";
import * as THREE from "three";

export default function Experience() {
  const currentState = useExperienceStore((state) => state.currentState);
  
  return (
    <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 2, 10], fov: 45 }}>
      <color attach="background" args={["#000000"]} />
      
      {/* Dense cinematic fog to hide edges and catch light */}
      <fog attach="fog" args={["#020503", 5, 80]} />
      <ScrollControls pages={3} damping={0.2} maxSpeed={0.5}>
        <CameraSystem />
        <Physics>
          <Stadium />
          <Penalty />
        </Physics>

        {/* Cinematic Tunnel Intro */}
        {(currentState === EXPERIENCE_STATES.TUNNEL || currentState === EXPERIENCE_STATES.INTRO || currentState === EXPERIENCE_STATES.STADIUM) && (
          <Tunnel />
        )}
        
        {/* Render Locker Room only when close enough or transitioning */}
        {(currentState === EXPERIENCE_STATES.STADIUM || currentState === EXPERIENCE_STATES.ABOUT) && (
          <LockerRoom />
        )}
        
        <TrainingGround />
        <Skills />
        <TrophyRoom />
        <MatchTimeline />
      </ScrollControls>
      
      {/* Basic realistic reflections */}
      <Environment preset="night" />

      {/* Post Processing for Cinematic Look */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={0.8} 
          mipmapBlur 
          intensity={0.4} 
        />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
}
