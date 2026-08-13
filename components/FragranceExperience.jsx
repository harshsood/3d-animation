'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PerfumeBottle({ scrollContainerRef }) {
  const bottleRef = useRef();
  const { scene } = useGLTF('/models/perfume_bottle.glb');

  useLayoutEffect(() => {
    if (!bottleRef.current || !scrollContainerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    // Step 1 -> Step 2: Rotate and shift to the right
    tl.to(bottleRef.current.rotation, {
      y: Math.PI * 1.2,
      x: 0.1,
      duration: 2,
    })
    .to(bottleRef.current.position, {
      x: 1.1,
      y: 0,
      z: 0,
      duration: 2,
    }, 0);

    // Step 2 -> Step 3: Recenter and zoom in slightly on nozzle
    tl.to(bottleRef.current.position, {
      x: 0,
      y: -0.3,
      z: 1.5,
      duration: 2,
    })
    .to(bottleRef.current.rotation, {
      x: 0.2,
      y: Math.PI * 2,
      duration: 2,
    }, '<');

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [scrollContainerRef]);

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.0005;
    }
  });

  return (
    <group ref={bottleRef} position={[0, 0, 0]} scale={0.8}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export default function FragranceExperience() {
  const containerRef = useRef();

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white font-sans">
      <div className="sticky top-0 left-0 w-full h-screen pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 10, 5]} intensity={1.8} color="#ffd700" />
          
          <PerfumeBottle scrollContainerRef={containerRef} />
          
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={8} blur={2} />
        </Canvas>
      </div>

      <div className="relative z-10">
        <section className="h-screen flex items-center justify-start px-8 md:px-20">
          <div className="max-w-lg">
            <span className="text-amber-500 uppercase tracking-widest text-sm font-bold">Luxury Collection</span>
            <h1 className="text-5xl md:text-7xl font-serif mt-2 tracking-wide">ROYAL OUD</h1>
            <p className="mt-4 text-gray-400 text-lg">An unforgettable fragrance crafted in Dubai, blending rare Cambodian oud and Damask rose.</p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-end px-8 md:px-20">
          <div className="max-w-md text-right">
            <span className="text-amber-500 uppercase tracking-widest text-sm font-bold">Craftsmanship</span>
            <h2 className="text-4xl font-serif mt-2">Hand-Cut Crystal</h2>
            <p className="mt-4 text-gray-400">Encased in heavy optical glass accented with real 24k gold foil detailing.</p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-center text-center px-8 md:px-20">
          <div className="max-w-xl">
            <span className="text-amber-500 uppercase tracking-widest text-sm font-bold">Notes Pyramid</span>
            <h2 className="text-4xl font-serif mt-2">Sensory Experience</h2>
            <p className="mt-4 text-gray-400">Top: Taif Rose, Saffron | Heart: Amberwood, Musk | Base: Pure Cambodian Oud</p>
            <button className="mt-8 px-8 py-3 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all pointer-events-auto">
              Explore Collection
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

useGLTF.preload('/models/perfume_bottle.glb');