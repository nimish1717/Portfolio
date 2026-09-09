import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';

export default function CharacterEffects({ showEffects = true }) {
  if (!showEffects) return null;

  return (
    <EffectComposer multisampling={4} disableNormalPass>
      <Noise opacity={0.025} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
