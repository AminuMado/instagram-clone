import React, { useContext } from "react";
import "./App.css";
import { Landing } from "./Components/Landing/Landing";
import { Home } from "./Components/Home/Home";
import { PostModal } from "./Components/Post/PostModal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./Components/Profile/Profile";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { UserContext } from "./Context/UserContext";
function App() {
  const { user } = useContext(UserContext);
  return (
    <ThemeContextProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="Post/:id" element={<PostModal />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
