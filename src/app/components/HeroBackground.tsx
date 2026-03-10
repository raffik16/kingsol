'use client';

import dynamic from 'next/dynamic';

const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false });

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <LiquidEther
        colors={['#ab0d0d', '#f7bb55', '#0b7109']}
        mouseForce={30}
        cursorSize={95}
        isViscous
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  );
}
