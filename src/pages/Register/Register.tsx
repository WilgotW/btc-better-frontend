import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="w-[100%] h-[1000px] flex justify-center items-center rounded">
      <div className="flex flex-col">
        <div className="bg-nvb text-white p-[20px] flex justify-center rounded">
          <h1 className="text-[20px]">Register</h1>
        </div>
        <div className="flex flex-col w-[500px] h-[500px] bg-white relative pt-6">
          <div className="flex flex-col w-[100%] gap-3">
            <div className="pl-6 pt-4 pr-6 flex flex-col">
              <TextField label="name" type="text" variant="outlined" />
            </div>
            <div className="pl-6 pt-4 pr-6 flex flex-col">
              <TextField label="email" type="text" variant="outlined" />
            </div>
            <div className="pl-6 pt-4 pr-6 flex flex-col">
              <TextField label="password" type="password" variant="outlined" />
            </div>
          </div>
          <div className="w-[100%] h-[100px] items-center flex pl-7">
            <Button
              style={{ background: "#F5F5F5", color: "black", width: "130px" }}
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </div>
          <div className="w-[100%] flex p-6 absolute bottom-3">
            <span>
              Already have an account?{" "}
              <u>
                <Link to={"/login"}>SIGN IN</Link>
              </u>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
