import React, { useContext } from "react";
import "./App.css";
import { Landing } from "./Components/Landing/Landing";
import { Home } from "./Components/Home/Home";
import { PostModal } from "./Components/Post/PostModal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./Components/Profile/Profile";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { UserContext } from "./Context/UserContext";
import { ActivePostContextProvider } from "./Context/ActivePostContext";
import { ActivePostContext } from "./Context/ActivePostContext";

function App() {
  const { user } = useContext(UserContext);
  const { activePost } = useContext(ActivePostContext);
  return (
    <ThemeContextProvider>
      <ActivePostContextProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Landing />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="Post/:id" element={<PostModal post={activePost} />} />
          </Routes>
        </BrowserRouter>
      </ActivePostContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
