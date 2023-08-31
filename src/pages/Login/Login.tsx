import React from "react";
import InputBar from "../../components/ui/InputBar";

export default function Login() {
  return (
    <div className="w-[100%] h-[1000px] flex justify-center items-center">
      <div className="flex flex-col">
        <div className="bg-nvb text-white p-[20px] flex justify-center">
          <h1 className="text-[20px]">Login</h1>
        </div>
        <div className="flex flex-col gap-1 w-[500px] h-[500px] bg-white justify-around">
          <div className="flex flex-col gap-2">
            <InputBar width={20} height={30} color="bg-g1" />
            <InputBar width={250} height={30} color="bg-g1" />
            <InputBar width={250} height={30} color="bg-g1" />
          </div>
          <div>
            <span>
              Don't have an account? <u>SIGN UP</u>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
