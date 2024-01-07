"use client"
import Image from 'next/image';
import FirstMesh from '@/app/components/FirstMesh';
import IntroHero from "@/app/components/IntroHero";
import About from "@/app/components/About";
import Navbar from './components/NavBar';
export default function Home() {
  return (
    <main>
      <Navbar name={"Fadhel"}/>
      <div className="flex flex-col items-center pt-14 relative">
        <IntroHero/>
        <About/>
        {/* <PlanetChargeScene/>  */}
        {/* <FirstMesh/> */}
        {/* <PlanetChargeScene/> */}
      </div>
    </main>

  )
}
