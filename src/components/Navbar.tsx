import React from "react";
import icon from "../assets/goldbetter-icon.png";
export default function Navbar() {
  return (
    <div className="relative w-[100%] h-[100px] bg-black flex justify-left items-center">
      <div className="flex justify-between w-[140px] h-[38px] z-10 bg-black ml-[30px] cursor-pointer">
        <img className="white-image" src={icon} alt="icon" />
        <div className="h-[100%] flex items-center pl-[10px]">
          <h2 className="text-white tracking-wider">GOLD BET</h2>
        </div>
      </div>
      <div className="w-[200px] h-[50px] absolute right-0 flex justify-around items-center text-white mr-[30px]">
        <div>SIGN IN</div>
        <div>ABOUT</div>
      </div>
    </div>
  );
}
