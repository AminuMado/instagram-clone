import React from "react";
import "./App.css";
import { Landing } from "./Components/Landing/Landing";
import { Home } from "./Components/Home/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
