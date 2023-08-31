import React from "react";

interface IProps {
  width: number;
  height: number;
  color: string;
}

export default function InputBar({
  width = 100,
  height = 25,
  color = "bg-white",
}: IProps) {
  return (
    <input className={`w-[${width}px] h-[${height}px] ${color}`} type="text" />
  );
}
