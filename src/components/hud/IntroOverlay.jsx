"use client";

import { useExperienceStore, EXPERIENCE_STATES } from "@/store/useExperienceStore";

export function IntroOverlay() {
  const setState = useExperienceStore((state) => state.setState);

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center pointer-events-auto">
      <div className="text-center mb-16 space-y-4">
        <p className="hud-text text-neutral-400 text-sm">THAPAR STADIUM</p>
        <p className="hud-text text-neutral-400 text-sm">MATCHDAY 01</p>
      </div>
      
      <div className="text-center space-y-6">
        <p className="hud-text text-neutral-500 text-xs tracking-widest">PLAYER</p>
        <h1 className="text-6xl md:text-8xl tracking-tight text-white">NIMISH AGRAWAL</h1>
        
        <div className="flex items-center justify-center space-x-12 mt-4 text-sm text-neutral-400 hud-text">
          <div className="text-center">
            <span className="block text-[10px] text-neutral-600">POSITION</span>
            <span>CREATIVE DEVELOPER</span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] text-neutral-600">NO.</span>
            <span>17</span>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <button
          onClick={() => setState(EXPERIENCE_STATES.TUNNEL)}
          className="hud-text text-white text-lg tracking-widest border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-colors duration-300"
        >
          ENTER THE PITCH
        </button>
      </div>
    </div>
  );
}
