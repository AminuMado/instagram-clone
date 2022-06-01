import "./Navbar.css";
import settings_Src from "../../Assets/Images/settings.png";
import back_Src from "../../Assets/Images/back1.png";
import upload_Src from "../../Assets/Images/newpost.png";
import { useState } from "react";
import Switcher from "../../Switcher";
import { Link } from "react-router-dom";
import { ImageUpload } from "../Post/NewPost";

export const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/Home">
        <h1>Star Wars World</h1>
      </Link>
      <div>
        <img
          onClick={() => setShowNewPost(!showNewPost)}
          src={upload_Src}
          alt="newpost_icon"
        />
        <img
          onClick={() => setShowOptions(true)}
          src={settings_Src}
          alt="menu_icon"
        />
      </div>

      <ImageUpload active={showNewPost} />

      <nav
        className={showOptions ? "navbar__options active" : "navbar__options"}
      >
        <Link to="/Profile">
          <span>Profile</span>
        </Link>
        <Link to="/">
          <span>Sign out</span>
        </Link>
        <img
          onClick={() => setShowOptions(false)}
          className="back_icon"
          src={back_Src}
          alt="back_icon"
        ></img>
        <Switcher />
      </nav>
    </nav>
  );
};
