import "./Landing.css";
import { Login } from "../Login/Login";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import Overlay from "../Overlay/Overlay";
import { useContext, useState } from "react";
import { Loading } from "../Loading/Loading";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import { LoadingContext } from "../../Context/LoadingContext";
import { UserContext } from "../../Context/UserContext";

const testAccount = {
  email: "startropperA@example.com",
  password: "12345678",
};
export const Landing = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const { handleSetIsLoading } = useContext(LoadingContext);
  const { setUser } = useContext(UserContext);
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
  const handleTestAccountClick = () => {
    const login = async () => {
      try {
        handleSetIsLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          testAccount.email,
          testAccount.password
        );
        const user = userCredential.user;
        localStorage.setItem("currentUser", JSON.stringify(user)); // save a user in localStorage
        setUser(user);
        handleSetIsLoading(false);
      } catch (err: any) {
        alert(err.message);
        handleSetIsLoading(false);
      }
    };
    login();
  };
  return (
    <>
      <Loading />
      <div className="Landing">
        <header className="Landing-header">
          <p onClick={handleSignInClick}>Sign in</p>
          <p onClick={handleCreateAccountClick}>Create Account</p>

          <p onClick={handleTestAccountClick}>Test Account</p>
        </header>
        <SignUpForm active={showSignUpForm} clearAll={clearAll} />
        <Login active={showLogin} clearAll={clearAll} />
        <Overlay active={showOverlay} handleClick={clearAll} />
      </div>
    </>
  );
};
