// IntoHero.js
import React from 'react';
import styles from "@/app/styles/IntroHero.module.css";
import { MdMouse } from "react-icons/md";

const AboutMe = () => {
  return (
    <div className="bg-blue-300 relative text-white w-8/12 h-auto mt-12 rounded-lg overflow-hidden border-2 border-slate-200 space-y-6">
      <div className={`skew-x-[-12deg] bg-white font-bungee font-extrabold text-7xl mt-12 w-6/12 h-[34rem] absolute top-[-4rem] right-[-42px]`}></div>
      <div className="text-white font-bungee text-6xl font-bold">
        About Me
      </div>
      <div className = "inline-block w-max relative">
        <div className="overflow-auto border-r-2 border-r-white text-lg w-[40rem] h-[12rem] text-white font-light scrollbar-hide">
            <div>
            I am a versatile Computer Science student at Singapore Management University, driven by a commitment to excellence and a passion for collaborative work environments. Currently pursuing a Bachelors of Science and as an Asean Undergraduate Scholarship Recipient, I am on track for Magna Cum Laude and remain dedicated to balancing both my personal learning and school.

    <br/><br/>As a former Frontend Developer at L3velUp Labs - a friend&#39;s startup, I received the pleasure of working with an amazing team and learning much from more seasoned developers within a team. I led the development of a concert seat selector using NEXT.JS and TailwindCSS and integrated Stripe for custom checkout flows and played a pivotal role in migrating app-wide state management to Jotai.

    <br/><br/>I have also had the pleasure of being awarded the CS203 Outstanding Project Award for TicketPulse, a performant concert ticket booking platform in recognition for the best software engineering project in the cohort and for dutifully enforcing software engineering fundamentals. By exploring gRPC for the underlying micro service architecture for the platform’s backend, we managed to drive the performance up by a significant amount.

    <br/><br/>I also showcased good perseverance and a keen collaborative spirit in my stint as a Research and Development Traineeship at SoftServe, where I explored the implementation of Quantum algorithms in NISQ-era devices. Despite being initially very unfamiliar and not even having taken important fundamental courses such as Linear Algebra, he remained committed and retained a collaborative spirit to effectively learn those concepts in quick time and convey complex ideas with the help of my peers, enabling us to deliver a successful capstone project together at the end of the term.
    I am always keen to take up new technologies on the go, and learning from others! Currently, I&#39;m learning ThreeJs to create 3D websites to leverage the browsers&#39; increasing graphical processing capabilities to deliver better web experiences. This portfolio website is the first step!
            </div>
        </div>
        <div className="text-white font-bungee font-light mt-6 flex items-center space-x-2 w-auto h-auto">
            <div>Scroll</div>
            <MdMouse className="animate-shake"/>
        </div>
      </div>

    </div>
  );
};

export default AboutMe;
