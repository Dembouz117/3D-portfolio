// Navbar.js
import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

interface NavbarProps{
    name: String | string
}

const Navbar = ({ name }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white text-black w-screen">
      {/* Left side - Your name */}
      <div className="text-2xl font-bold font-bungee">{name}</div>

      {/* Right side - Hamburger icon */}
      <div className="cursor-pointer mr-4 text-3xl">
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;