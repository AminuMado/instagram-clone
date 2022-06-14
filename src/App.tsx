import React, { useContext } from "react";
import "./App.css";
import { Landing } from "./Components/Landing/Landing";
import { Home } from "./Components/Home/Home";
import { PostModal } from "./Components/Post/PostModal";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./Components/Profile/Profile";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { UserContext } from "./Context/UserContext";
import { ActivePostContext } from "./Context/ActivePostContext";
import { UserProfileContext } from "./Context/UserProfileContext";
import { LoadingContextProvider } from "./Context/LoadingContext";

function App() {
  const { user } = useContext(UserContext);
  const { activePost } = useContext(ActivePostContext);
  const { userProfile } = useContext(UserProfileContext);
  return (
    <ThemeContextProvider>
      <LoadingContextProvider>
        <HashRouter basename="/">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Landing />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Profile" element={<Profile user={userProfile} />} />
            <Route path="Post/:id" element={<PostModal post={activePost} />} />
          </Routes>
        </HashRouter>
      </LoadingContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
