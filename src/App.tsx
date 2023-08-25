import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="h-[100vh] overflow-y-hidden bg-g1">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
