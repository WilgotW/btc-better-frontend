import React from "react";
import LiveGraph from "./LiveGraph";
export default function Home() {
  return (
    <div className="w-[100%] h-[100%] flex justify-center">
      <div className="w-[1500px] h-[100%] bg-g2 flex-col">
        <div className="w-[100%] flex justify-center">
          <div className="flex items-center h-[200px]">
            <h1 className="text-[4rem] text-white">$61 632,82</h1>
          </div>
        </div>
        <div className="flex justify-center">
          <LiveGraph graphValue={10} />
        </div>
      </div>
    </div>
  );
}
