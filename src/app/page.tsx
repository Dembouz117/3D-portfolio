"use client"
import Image from 'next/image';
import FirstMesh from '@/app/components/FirstMesh';
import IntroHero from "@/app/components/IntroHero";
import About from "@/app/components/About";
import Navbar from './components/NavBar';
import SkillsModal from './components/SkillsModal';

export default function Home() {
  return (
    <main>
      <Navbar name={"Fadhel"}/>
      <div className="flex flex-col items-center pt-14 px-8 relative">
        <IntroHero/>
        <About/>
        <SkillsModal/>
      </div>
    </main>

  )
}
