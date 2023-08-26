import React from "react";
import Bet from "./Bet";

export default function BetsBoard() {
  return (
    <div className="h-[350px] p-[50px]">
      <div className="bg-g1 h-[100%] w-[500px] rounded-[10px] flex flex-col">
        <div className="flex justify-center p-[10px]">
          <h1 className="text-[20px] text-g3 tracking-wide">BETS</h1>
        </div>
        <div className="flex flex-col h-[200px] gap-[1px]">
          <Bet />
          <Bet />
          <Bet />
          <Bet />
        </div>
      </div>
    </div>
  );
}
