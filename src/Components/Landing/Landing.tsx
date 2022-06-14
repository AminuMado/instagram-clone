import "./Landing.css";
import { Login } from "../Login/Login";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import Overlay from "../Overlay/Overlay";
import { useState } from "react";
import { Loading } from "../Loading/Loading";

export const Landing = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

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
  };
  const handleTestAccountClick = () => {};
  return (
    <>
      <Loading />
      <div className="Landing">
        <header className="Landing-header">
          <p onClick={handleSignInClick}>Sign in</p>
          <p onClick={handleCreateAccountClick}>Create Account</p>

          <p onClick={handleTestAccountClick}>Test Account</p>
        </header>
        <SignUpForm active={showSignUpForm} />
        <Login active={showLogin} />
        <Overlay active={showOverlay} handleClick={clearAll} />
      </div>
    </>
  );
};
