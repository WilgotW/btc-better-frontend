import React from "react";

interface IProps {
  width: number;
  height: number;
}

export default function InputBar({ width = 100, height = 25 }: IProps) {
  return <input className={`w-[${width}] h-[${height}]`} type="text" />;
}
