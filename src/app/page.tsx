"use client"
import Image from 'next/image';
import FirstMesh from '@/app/components/FirstMesh';
import IntroHero from "@/app/components/IntroHero";
import About from "@/app/components/About";
import Navbar from './components/NavBar';
import PointLightScene from './components/PointLight';
export default function Home() {
  return (
    <main>
      <Navbar name={"Fadhel"}/>
      <div className="flex flex-col items-center pt-14 px-8 relative bg-white">
        <IntroHero/>
        <About/>
      </div>
    </main>

  )
}
