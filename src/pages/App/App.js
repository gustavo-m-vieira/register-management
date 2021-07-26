import React, { useEffect, useState } from "react";
import Routes from "../../Routes";
import { AppContext } from "../../libs/contextLib";
import Navbar from "../Navbar";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    const userIsAuthenticated = localStorage.getItem('userIsAuthenticated');
    userHasAuthenticated(userIsAuthenticated === 'authenticated');
  }, []);

  return (
    <div className="App container py-3">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Navbar />
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;