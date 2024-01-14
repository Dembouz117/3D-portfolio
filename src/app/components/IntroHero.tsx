// IntoHero.js
import React, { useState, useEffect } from 'react';
import PlanetChargeScene from './PlanetChargeScene';
import ShineCard from './ShineCard';
import Experience from "@/app/components/Experience";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";

import * as THREE from "three";

const IntoHero = () => {
  const cameraControls = useControls({
    // Define your camera controls here
    position: [1, 3, 5],
    fov: { value: 40, min: 1, max: 100 },
  });
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(()=>setFadeIn(true), 200);
  },[]);

  const [cameraSettings, setCameraSettings] = useState({
    left: -1,
    right: 1,
    top: 4,
    bottom: -1,
    near: 2,
    far: 15,
    position: new THREE.Vector3(3,3,8),
  });

  useEffect(()=>{
    const handleResize = () => {
      const containerWidth = window.innerWidth; // or get the width of your container element
      const containerHeight = 36; // Set your desired height in 'rem' and convert to pixels

      // Update camera settings based on container size
      setCameraSettings({
        ...cameraSettings,
        left: -containerWidth / 2,
        right: containerWidth / 2,
        top: containerHeight / 2,
        bottom: -containerHeight / 2,
      });
      console.log(containerWidth);
      console.log(containerHeight);
    };


    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  },[]);

  return (
    <ShineCard className={`bg-gradient-to-b from-red-100 to-red-300 p-2 relative text-white flex flex-col items-center w-full inline-block rounded-3xl transition-transform ${fadeIn?"scale-100":"scale-0"} ease-out duration-3000`}>
      <div className={`font-bungee font-extrabold text-7xl mt-12`}>
        HELLO, I'M FADHEL
      </div>
      <div className = "inline-block w-max">
        <div className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white text-lg">Aspiring full-stack software engineer based in Singapore.</div>
      </div>
      {/* <div className="w-full h-[36rem] bg-blue-200">
hell
      </div> */}
      <Canvas style={{ position: 'relative', width: '100%', height: '36rem'}}>
        <PerspectiveCamera makeDefault position={cameraControls.position} fov={cameraControls.fov} />
        <Experience />
      </Canvas>
    </ShineCard>
  );
};

export default IntoHero;
