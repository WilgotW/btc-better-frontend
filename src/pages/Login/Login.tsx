import React from "react";
import InputBar from "../../components/ui/InputBar";

export default function Login() {
  return (
    <div className="w-[100%] flex justify-center">
      <div>
        <h1>Login</h1>
        <InputBar width={100} height={25} />
      </div>
    </div>
  );
}
