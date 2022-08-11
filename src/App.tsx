import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import { getUserInfo } from "./services/getUser";
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
      <Home user={user} />
    </div>
  );
};

export default App;
