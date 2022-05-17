import "./SignUpForm.css";
import avatar_Src from "../../Assets/Images/Avatars/1.png";
import { useState } from "react";

type SignUpFormProps = {
  active: boolean;
};
export const SignUpForm = (props: SignUpFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={props.active ? "active" : "signUpForm_container"}>
      <form className="signUpForm">
        <div className="signUpForm__avatar">
          <label htmlFor="avatar">Avatar</label>
          {/* <avatar icon that links to the avatar selection modal> */}
          <img className="avatar_icon" src={avatar_Src} alt="avatar" />
        </div>
        <div>
          <label htmlFor="username">UserName</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Bobba Fett"
            value={username}
          ></input>
        </div>
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

        <button>Sign up</button>
      </form>
    </div>
  );
};
