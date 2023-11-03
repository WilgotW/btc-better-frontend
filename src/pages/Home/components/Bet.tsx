import React, { useEffect, useState } from "react";

interface IProps {
  amount: number;
  startDate: number;
  duration: number;
}

export default function Bet({ amount, startDate, duration }: IProps) {
  const [date, setDate] = useState<string>("");
  useEffect(() => {
    console.log(startDate);
    const _date = new Date(startDate * 1000);
    setDate(
      `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
    );
  }, []);
  return (
    <div className="flex justify-around items-center h-[70px] w-[100%] ">
      <div>BET: {amount}$</div>
      <div>DATE: {date}</div>
      <div>DURATION: {duration}min</div>
      <div className="text-[#59de00]">PROFIT: [PENDING]</div>
    </div>
  );
}
