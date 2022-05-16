import "./Login.css";
import { useState } from "react";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
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

      <button>Sign in</button>
    </form>
  );
};
