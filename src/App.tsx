import React, { useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import LatestSightings from "./components/Sightings/LatestSightings/LatestSightings";
import Favorite from "./components/Favorite/Favorite";
import { Routes, Route } from "react-router-dom";
import { useLazyGetUserInfoQuery } from "./features/services/userApi";
import jwt_decode from "jwt-decode";
import "./App.css";

const App: React.FC = () => {
  const token = localStorage.getItem("user-token");
  const [trigger] = useLazyGetUserInfoQuery();

  useEffect(() => {
    if (token) {
      const decodedToken: { user_id: number; exp: number } = jwt_decode(token);
      trigger(decodedToken.user_id);
    }
  }, [token]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/flowers" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/latest-sightings" element={<LatestSightings />} />
        </>
      </Routes>
    </div>
  );
};

export default App;
