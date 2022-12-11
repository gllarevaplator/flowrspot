import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import LatestSightings from "./components/Sightings/LatestSightings/LatestSightings";
import { getUserInfo } from "./services/getUser";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import "./App.css";

interface User {
  user: {
    name: string;
    email: string;
  };
}

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  console.log(user);

  useEffect(() => {
    if (user == null) {
      getUserInfo().then((user) => setUser(user));
    }
  }, [user]);

  return (
    <div className="App">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
};

export default App;
