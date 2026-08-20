import { create } from 'zustand';

export const useStore = create((set) => ({
    activeWorld: 'hero', // 'hero', 'about', 'marquee', 'projects', 'skills', etc.
    setActiveWorld: (world) => set({ activeWorld: world }),
    
    scrollProgress: 0,
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    
    scrollVelocity: 0,
    setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),

    // High quality mode toggle (adaptive quality manager foundation)
    quality: 'high', // 'high', 'medium', 'low', 'mobile'
    setQuality: (q) => set({ quality: q }),

    // Accessibility
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    setReducedMotion: (val) => set({ reducedMotion: val }),

    // Skill system
    activeSkillCategory: 'FRONTEND',
    setActiveSkillCategory: (category) => set({ activeSkillCategory: category })
}));
