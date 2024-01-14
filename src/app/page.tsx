"use client"

import { Canvas } from "@react-three/fiber";
import Image from 'next/image';
import FirstMesh from '@/app/components/FirstMesh';
import IntroHero from "@/app/components/IntroHero";
import About from "@/app/components/About";
import Navbar from './components/NavBar';
import SkillsModal from './components/SkillsModal';
import Projects from "@/app/components/Projects";
import Experience from "./components/Experience";

import { OrthographicCamera } from "@react-three/drei";



export default function Home() {
  return (
    <main>
      <Navbar name={"Fadhel"}/>
      <div className="flex flex-col items-center pt-14 px-8 relative">
        <IntroHero/>
        <About/>
        <SkillsModal/>
        {/* <Canvas>
          <Projects/>
        </Canvas> */}

      </div>
    </main>

  )
}
