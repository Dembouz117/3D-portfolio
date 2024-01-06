"use client"
import Image from 'next/image';
import FirstMesh from './components/FirstMesh';
import IntroHero from "@/app/components/IntroHero"
export default function Home() {
  return (
    <main className="flex flex-col items-center pt-16 relative bg-blue-500">
      {/* <FirstMesh/> */}
      <IntroHero/>
    </main>
  )
}
