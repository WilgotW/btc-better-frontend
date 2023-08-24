import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import colors from "./data/colors";

function App() {
  return (
    <div className={`h-[100vh] overflow-y-hidden bg-[${colors.g1}]`}>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
