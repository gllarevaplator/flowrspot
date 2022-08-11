import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import { get } from "./services/apiService";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Home />
    </div>
  );
};

export default App;
