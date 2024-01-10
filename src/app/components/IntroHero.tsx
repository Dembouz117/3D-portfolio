// IntoHero.js
import React, { useState, useEffect } from 'react';
import PlanetChargeScene from './PlanetChargeScene';
import ShineCard from './ShineCard';

const IntoHero = () => {

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(()=>setFadeIn(true), 200);
  },[]);

  return (
    <ShineCard className={`bg-gradient-to-b from-red-100 to-red-300 p-2 relative text-white flex flex-col items-center w-full h-72 rounded-3xl transition-transform ${fadeIn?"scale-100":"scale-0"} ease-out duration-3000`}>
      <div className={`font-bungee font-extrabold text-7xl mt-12`}>
        HELLO, I'M FADHEL
      </div>
      <div className = "inline-block w-max">
        <div className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white text-lg">Aspiring full-stack software engineer based in Singapore.</div>
      </div>
    </ShineCard>
  );
};

export default IntoHero;
