import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserRoute from "./Routes/UserRoute";
import AdminRoute from "./Routes/AdminRoute";
import UserContextProvider from "./Context/UserContext.jsx";
import Navbar from "./Components/Navbar.jsx";

import React from "react";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <Navbar/>
        <UserRoute />
        <AdminRoute />
      </UserContextProvider>
    </div>
  );
};

export default App;
