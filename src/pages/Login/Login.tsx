import InputBar from "../../components/ui/InputBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [missingInputs, setMissingInputs] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  async function login(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault();

    if (!allInputs()) {
      setMissingInputs(true);
      return;
    }
    setMissingInputs(false);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);

      const authKey = data.user.token;
      localStorage.setItem("authorization", authKey);
      console.log(authKey);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
    resetInputs();
    setLoading(false);
  }

  function allInputs(): boolean {
    if (!email || !password) return false;
    return true;
  }

  function resetInputs() {
    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="w-[100%] h-[1000px] flex justify-center items-center rounded">
      <div className="flex flex-col">
        <div className="bg-nvb text-white p-[20px] flex justify-center rounded">
          <h1 className="text-[20px]">Login</h1>
        </div>
        <div className="flex flex-col w-[500px] h-[500px] bg-white relative pt-6">
          <div className="flex flex-col w-[100%] gap-3">
            <div className="pl-6 pt-4 pr-6 flex flex-col">
              <TextField
                label="email"
                type="text"
                variant="outlined"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className="pl-6 pt-4 pr-6 flex flex-col pb-[80px]">
              <TextField
                label="password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
          </div>
          <div className="h-8 flex pl-6 pt-4">
            {missingInputs && (
              <span className="text-[red]">Please fill out all inputs</span>
            )}
          </div>
          <div className="w-[100%] h-[100px] items-center flex pl-7">
            <Button
              onClick={(ev) => login(ev)}
              style={{ background: "#F5F5F5", color: "black", width: "130px" }}
              variant="contained"
              color="primary"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
          <div className="w-[100%] flex p-6 absolute bottom-3">
            <span>
              Don't have an account?{" "}
              <u>
                <Link to={"/register"}>SIGN UP</Link>
              </u>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
