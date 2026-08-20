import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Icosahedron, MeshDistortMaterial } from '@react-three/drei';

const InteractiveObject = ({ controls }) => {
    const meshRef = useRef(null);
    const materialRef = useRef(null);
    
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * controls.speed;
            meshRef.current.rotation.y += delta * controls.speed;
        }
    });

    return (
        <Icosahedron ref={meshRef} args={[2, 2]} scale={1.2}>
            <MeshDistortMaterial 
                ref={materialRef} 
                color="#ccff00" 
                distort={controls.distortion} 
                speed={controls.speed * 5}
                metalness={0.9} 
                roughness={controls.noise}
                emissive="#ccff00"
                emissiveIntensity={controls.glow}
                wireframe={controls.noise > 0.5}
            />
        </Icosahedron>
    );
};

export const DigitalLab = () => {
    const [controls, setControls] = useState({
        distortion: 0.4,
        speed: 0.5,
        glow: 0.2,
        noise: 0.1
    });

    const handleReset = () => {
        setControls({
            distortion: 0.4,
            speed: 0.5,
            glow: 0.2,
            noise: 0.1
        });
    };

    return (
        <section id="lab" className="w-full relative bg-black flex flex-col items-start p-6 md:p-12 border-t border-r border-white/10 min-h-screen xl:w-1/3 float-left border-b">
            
            <div className="z-10 w-full mb-8">
                <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tighter uppercase mb-4">
                    DIGITAL LAB
                </h2>
                <p className="font-mono text-[10px] md:text-xs tracking-widest text-white/50 max-w-sm uppercase">
                    Play, rotate, drag and break things. It's fun.
                </p>
                <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase mt-4">
                    THIS DOES NOTHING.<br />I JUST LIKE IT.
                </p>
            </div>
            
            <div className="w-full flex-1 relative min-h-[400px] border border-white/10 rounded-xl overflow-hidden" data-cursor="DRAG">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
                    <ambientLight intensity={0.5}/>
                    <directionalLight position={[10, 10, 5]} intensity={1}/>
                    <Environment preset="studio"/>
                    
                    <InteractiveObject controls={controls} />
                    
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
                </Canvas>
                
                {/* Controls Overlay */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-white/10 p-4 rounded text-[10px] font-mono tracking-widest uppercase flex flex-col gap-4 min-w-[150px]">
                    <div className="text-white/40 mb-2 border-b border-white/10 pb-2">CONTROLS</div>
                    
                    {Object.entries(controls).map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <span>{key}</span>
                                <span className="text-accent">{value.toFixed(2)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.01" 
                                value={value}
                                onChange={(e) => setControls(prev => ({...prev, [key]: parseFloat(e.target.value)}))}
                                className="w-full h-1 bg-white/20 appearance-none rounded cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>
                    ))}
                    
                    <button onClick={handleReset} className="mt-2 border border-white/20 hover:border-accent hover:text-accent py-1.5 transition-colors">
                        RESET
                    </button>
                </div>
            </div>
        </section>
    );
};
