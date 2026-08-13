'use client';

import dynamic from 'next/dynamic';

const FragranceExperience = dynamic(
  () => import('../components/FragranceExperience'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black">
      <FragranceExperience />
    </main>
  );
}
