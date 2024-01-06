// IntoHero.js
import React from 'react';
import styles from "@/app/styles/IntroHero.module.css";

const IntoHero = () => {
  return (
    <div className="bg-gradient-to-b from-red-100 to-red-500 p-8 relative text-white flex flex-col items-center w-10/12 h-72">
      <div className={`font-bungee font-extrabold text-7xl mt-12`}>
        HELLO, I'M FADHEL
      </div>
      <div className = "inline-block w-max">
        <div className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white text-lg">I'm an aspiring software engineer based in Singapore.</div>
      </div>

    </div>
  );
};

export default IntoHero;
