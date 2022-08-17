import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import LatestSightings from "./components/Sightings/LatestSightings/LatestSightings";
import { getUserInfo } from "./services/getUser";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  const [user, setUser] = useState<null | Object>(null);

  useEffect(() => {
    if (user == null) {
      getUserInfo().then((user) => setUser(user));
    }
  }, []);

  return (
    <div className="App">
      <NavBar user={user} />
      <Routes>
        <>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/flowers" element={<Home user={user} />} />
          <Route
            path="/latest-sightings"
            element={<LatestSightings user={user} />}
          />
        </>
      </Routes>
    </div>
  );
};

export default App;
