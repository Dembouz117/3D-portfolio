"use client"
import Image from 'next/image';
import FirstMesh from '@/app/components/FirstMesh';
import IntroHero from "@/app/components/IntroHero";
import About from "@/app/components/About";
import PlanetChargeScene from './components/PlanetChargeScene';
export default function Home() {
  return (
    <main className="flex flex-col items-center pt-16 relative">
      {/* <FirstMesh/> */}
       <IntroHero/>
      <About/>
      {/* <PlanetChargeScene/>  */}
      {/* <FirstMesh/> */}
      {/* <PlanetChargeScene/> */}
    </main>
  )
}
