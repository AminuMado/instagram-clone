import "./Landing.css";
import { Login } from "../Login/Login";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import { Link } from "react-router-dom";
import Overlay from "../Overlay/Overlay";
import { useState } from "react";
import { Avatar } from "../Avatar/Avatar";

export const Landing = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const handleSignInClick = () => {
    setShowOverlay(true);
    setShowLogin(true);
  };
  const handleCreateAccountClick = () => {
    setShowOverlay(true);
    setShowSignUpForm(true);
  };
  const clearAll = () => {
    setShowOverlay(false);
    setShowLogin(false);
    setShowSignUpForm(false);
    setShowAvatar(false);
  };
  return (
    <div className="Landing">
      <header className="Landing-header">
        <p onClick={handleSignInClick}>Sign in</p>
        <p onClick={handleCreateAccountClick}>Create Account</p>
        <Link to="/Home">
          <p>Test Account</p>
        </Link>
      </header>
      <Avatar active={showAvatar} setShowAvatar={setShowAvatar} />
      <SignUpForm active={showSignUpForm} setShowAvatar={setShowAvatar} />
      <Login active={showLogin} />
      <Overlay active={showOverlay} handleClick={clearAll} />
    </div>
  );
};
