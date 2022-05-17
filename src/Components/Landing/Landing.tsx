import "./Landing.css";
import { Login } from "../Login/Login";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import { Link } from "react-router-dom";
import Overlay from "../Overlay/Overlay";
import { useState } from "react";

export const Landing = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div className="Landing">
      <header className="Landing-header">
        <p onClick={(e) => setShowOverlay(true)}>Sign in</p>
        <p>Create Account</p>
        <Link to="/Home">
          <p>Test Account</p>
        </Link>
      </header>
      <SignUpForm />
      <Login />
      <Overlay showOverlay={showOverlay} />
    </div>
  );
};
