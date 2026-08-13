'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
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

    tl.to(bottleRef.current.rotation, {
      y: Math.PI * 1.5,
      x: 0.1,
      duration: 2,
    })
    .to(bottleRef.current.position, {
      x: 1.2,
      y: -0.2,
      z: 0.5,
      duration: 2,
    }, 0);

    tl.to(bottleRef.current.position, {
      x: 0,
      y: -1.2,
      z: 3.2,
      duration: 2,
    })
    .to(bottleRef.current.rotation, {
      x: 0.3,
      y: Math.PI * 2,
      duration: 2,
    }, '<');

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [scrollContainerRef]);

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.0008;
    }
  });

  return (
    
  );
}

export default function FragranceExperience() {
  const containerRef = useRef();

  return (
    
      
        
          
          
          
          
          
          
          
        
      

      
        
          
            Luxury Collection
            ROYAL OUD
            An unforgettable fragrance crafted in Dubai, blending rare Cambodian oud and Damask rose.
          
        

        
          
            Craftsmanship
            Hand-Cut Crystal
            Encased in heavy optical glass accented with real 24k gold foil detailing.
          
        

        
          
            Notes Pyramid
            Sensory Experience
            Top: Taif Rose, Saffron | Heart: Amberwood, Musk | Base: Pure Cambodian Oud
            
              Explore Collection
            
          
        
      
    
  );
}

useGLTF.preload('/models/perfume_bottle.glb');
