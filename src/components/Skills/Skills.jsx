import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const skills = [
    { name: "REACT", color: "#61dafb", radius: 250, angle: 0 },
    { name: "THREE.JS", color: "#ffffff", radius: 200, angle: 45 },
    { name: "GSAP", color: "#88ce02", radius: 220, angle: 90 },
    { name: "JAVASCRIPT", color: "#f7df1e", radius: 280, angle: 135 },
    { name: "TYPESCRIPT", color: "#3178c6", radius: 260, angle: 180 },
    { name: "PYTHON", color: "#3776ab", radius: 230, angle: 225 },
    { name: "SQL", color: "#e38c00", radius: 290, angle: 270 },
    { name: "UI / UX", color: "#ff3366", radius: 210, angle: 315 },
];

export const Skills = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [hoveredSkill, setHoveredSkill] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        let mouse = { x: -1000, y: -1000 };
        const center = { x: width / 2, y: height / 2 };
        
        let time = 0;
        let baseSpeed = 0.001;
        let currentSpeed = baseSpeed;
        
        let particles = [];
        
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        window.addEventListener('mousemove', handleMouseMove);
        
        let animationId;
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, width, height);
            
            time += currentSpeed;
            
            let currentHover = null;
            let centerPulse = 0;

            // Update node positions
            const nodes = skills.map(skill => {
                const angle = (skill.angle * Math.PI / 180) + time;
                // ML hover reorganizes network
                const r = hoveredSkill === 'MACHINE LEARNING' ? skill.radius * 0.5 : skill.radius;
                const x = center.x + Math.cos(angle) * r;
                const y = center.y + Math.sin(angle) * r;
                
                const distToMouse = Math.sqrt(Math.pow(x - mouse.x, 2) + Math.pow(y - mouse.y, 2));
                let isHovered = distToMouse < 40;
                if (isHovered) {
                    currentHover = skill.name;
                }
                
                return { ...skill, x, y, isHovered, angle };
            });

            // Update React state safely if changed
            if (currentHover !== hoveredSkill) {
                // We shouldn't setState in requestAnimationFrame if it triggers re-renders of heavy canvas
                // So we just use a ref or internal variable for canvas logic, and maybe debounce setState for React UI
            }

            // Interactions
            if (currentHover === 'GSAP') {
                currentSpeed = gsap.utils.interpolate(currentSpeed, baseSpeed * 10, 0.1);
            } else {
                currentSpeed = gsap.utils.interpolate(currentSpeed, baseSpeed, 0.1);
            }

            if (currentHover === 'THREE.JS') {
                centerPulse = Math.sin(time * 50) * 20;
            }

            // Draw center connections
            ctx.lineWidth = 1;
            nodes.forEach(node => {
                ctx.beginPath();
                ctx.moveTo(center.x, center.y);
                ctx.lineTo(node.x, node.y);
                
                if (currentHover === 'REACT' && node.isHovered) {
                    ctx.strokeStyle = node.color;
                    ctx.lineWidth = 3;
                } else if (currentHover === 'MACHINE LEARNING') {
                    ctx.strokeStyle = 'rgba(204, 255, 0, 0.5)';
                } else {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                }
                ctx.stroke();
            });

            // Draw Python data particles
            if (currentHover === 'PYTHON') {
                const pythonNode = nodes.find(n => n.name === 'PYTHON');
                if (pythonNode) {
                    if (Math.random() > 0.5) {
                        particles.push({
                            x: pythonNode.x,
                            y: pythonNode.y,
                            vx: (Math.random() - 0.5) * 5,
                            vy: (Math.random() - 0.5) * 5,
                            life: 1
                        });
                    }
                }
            }

            // Update & draw particles
            particles = particles.filter(p => p.life > 0);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(55, 118, 171, ${p.life})`;
                ctx.fill();
            });

            // Draw nodes
            nodes.forEach(node => {
                ctx.beginPath();
                const radius = node.isHovered ? 8 : 4;
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = node.isHovered ? node.color : '#444';
                ctx.fill();
                
                if (node.isHovered) {
                    ctx.shadowColor = node.color;
                    ctx.shadowBlur = 15;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }

                ctx.font = node.isHovered ? "bold 12px monospace" : "10px monospace";
                ctx.fillStyle = node.isHovered ? "#fff" : "rgba(255, 255, 255, 0.5)";
                ctx.fillText(node.name, node.x + 15, node.y + 4);
            });

            // Draw Center Node
            ctx.beginPath();
            ctx.arc(center.x, center.y, 50 + centerPulse, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(204, 255, 0, 0.1)";
            ctx.fill();
            ctx.strokeStyle = "#ccff00";
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.font = "bold 14px sans-serif";
            ctx.fillStyle = "#ccff00";
            ctx.textAlign = "center";
            ctx.fillText("NIMISH", center.x, center.y - 5);
            ctx.font = "10px monospace";
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fillText("CREATIVE ENGINE", center.x, center.y + 10);
            ctx.textAlign = "left"; // reset

            animationId = requestAnimationFrame(draw);
        };
        
        draw();
        
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            center.x = width / 2;
            center.y = height / 2;
        };
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <section ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden border-t border-white/10 flex items-center justify-center">
            <div className="absolute top-12 left-6 md:left-12 z-10 pointer-events-none flex flex-col gap-4">
                <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter uppercase text-white">
                    SKILL<br />REACTOR
                </h2>
                <p className="text-xs font-mono text-white/50 max-w-xs">
                    Hover around and see how the system reacts. Don't trust a static list.
                </p>
            </div>
            <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair"/>
        </section>
    );
};
