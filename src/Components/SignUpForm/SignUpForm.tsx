import "./SignUpForm.css";
import avatar_Src from "../../Assets/Images/Avatars/1.png";
import { useEffect, useState } from "react";
import { AvatarPicker } from "../Avatar/AvatarPicker";
import { Avatar } from "../Avatar/Avatar";

type SignUpFormProps = {
  active: boolean;
};
export const SignUpForm = (props: SignUpFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(avatar_Src);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  useEffect(() => {
    if (props.active === false) {
      setShowAvatarPicker(false);
    }
  }, [props.active]);
  return (
    <>
      <div
        className={
          props.active ? "signUpForm_container active" : "signUpForm_container"
        }
      >
        <form className="signUpForm">
          <div className="signUpForm__avatar_container">
            <label htmlFor="avatar">Avatar</label>
            <Avatar
              src={avatar}
              handleClick={() => {
                setShowAvatarPicker(true);
              }}
            />
          </div>
          <div className="signUpForm_input_container">
            <label htmlFor="username">UserName</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              placeholder="Bobba Fett"
              value={username}
            ></input>
          </div>
          <div className="signUpForm_input_container">
            <label htmlFor="email"> Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="bobbafett@example.com"
              value={email}
            ></input>
          </div>
          <div className="signUpForm_input_container">
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
      <AvatarPicker
        active={showAvatarPicker}
        setShowAvatarPicker={setShowAvatarPicker}
        setAvatar={setAvatar}
      />
    </>
  );
};
