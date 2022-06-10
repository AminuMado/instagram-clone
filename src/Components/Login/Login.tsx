import "./Login.css";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import { LoadingContext } from "../../Context/LoadingContext";
type LoginProps = {
  active: boolean;
};
export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSetIsLoading } = useContext(LoadingContext);

  const { user, setUser } = useContext(UserContext);
  const login = async () => {
    try {
      handleSetIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
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
  console.log(user);
  return (
    <div
      className={
        props.active ? "loginForm_container active" : "loginForm_container"
      }
    >
      <form className="loginForm">
        <div className="wrapper_container">
          <div>
            <label htmlFor="email"> Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="bobbafett@example.com"
              value={email}
            ></input>
          </div>
          <div>
            <label htmlFor="password"> Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              value={password}
            ></input>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
