"use client";

import { useExperienceStore, EXPERIENCE_STATES } from "@/store/useExperienceStore";
import { useState } from "react";

export function HUD() {
  const currentState = useExperienceStore((state) => state.currentState);
  const setState = useExperienceStore((state) => state.setState);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "HOME", state: EXPERIENCE_STATES.INTRO },
    { label: "PLAYER", state: EXPERIENCE_STATES.ABOUT },
    { label: "PROJECTS", state: EXPERIENCE_STATES.PROJECTS },
    { label: "SKILLS", state: EXPERIENCE_STATES.SKILLS },
    { label: "ACHIEVEMENTS", state: EXPERIENCE_STATES.ACHIEVEMENTS },
    { label: "JOURNEY", state: EXPERIENCE_STATES.JOURNEY },
    { label: "CONTACT", state: EXPERIENCE_STATES.CONTACT },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="w-full flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col">
          <h2 className="text-4xl text-white tracking-tighter">N17</h2>
          <span className="text-xs text-neutral-500 hud-text">CAREER MODE</span>
        </div>
        
        <div className="flex gap-6 relative z-50">
          <button 
            onClick={() => useExperienceStore.getState().toggleSound()}
            className="hud-text text-sm tracking-widest text-white hover:text-accent transition-colors"
          >
            SOUND: {useExperienceStore((state) => state.soundEnabled) ? "ON" : "OFF"}
          </button>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="hud-text text-sm tracking-widest text-white hover:text-accent transition-colors"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Quick View Menu Overlay */}
      {menuOpen && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto">
          <div className="text-accent hud-text text-xl mb-12 tracking-widest">QUICK VIEW</div>
          <ul className="space-y-6 text-center">
            {menuItems.map((item, index) => (
              <li key={item.state}>
                <button
                  onClick={() => {
                    setState(item.state);
                    setMenuOpen(false);
                  }}
                  className={`hud-text text-3xl md:text-5xl tracking-widest transition-colors duration-300 ${
                    currentState === item.state ? "text-accent" : "text-white hover:text-neutral-400"
                  }`}
                >
                  <span className="text-xs text-neutral-500 mr-4">0{index + 1}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Information (Contextual based on State) */}
      <div className="w-full flex justify-between items-end pointer-events-none mt-auto">
        <div className="flex flex-col">
          <span className="hud-text text-xs text-neutral-500">CURRENT STAGE</span>
          <span className="hud-text text-lg text-white">{currentState}</span>
        </div>
        
        {/* Interaction hints */}
        {currentState === EXPERIENCE_STATES.STADIUM && (
          <div className="hud-text text-xs text-white/50 animate-pulse">
            [ AIM AND CLICK TO KICK ]
          </div>
        )}
      </div>
    </>
  );
}
