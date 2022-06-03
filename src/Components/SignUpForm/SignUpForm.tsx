import "./SignUpForm.css";
import avatar_Src from "../../Assets/Images/Avatars/1.png";
import { useEffect, useState } from "react";
import { AvatarPicker } from "../Avatar/AvatarPicker";
import { Avatar } from "../Avatar/Avatar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

type SignUpFormProps = {
  active: boolean;
};
export const SignUpForm = (props: SignUpFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(avatar_Src);
  const [showAvatarPicker, setShowAvatarPicker] = useState<boolean>(false);
  const [user, setUser] = useState<{} | null>(null);
  const signUp = () => {
    const auth = getAuth();
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
  useEffect(() => {
    if (props.active === false) {
      setShowAvatarPicker(false);
    }
  }, [props.active]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(authUser);
        const uid = authUser.uid;
        setUser(authUser); // authUser will always be a user in this scope
        // ...
        if (authUser.displayName) {
          // dont update username
        } else {
          return updateProfile(authUser, { displayName: username });
        }
      } else {
        //user has logged out
        setUser(authUser); // authuser in this case will always be null in this scope
      }
    });

    return () => {
      //perform some cleanup action, this is used to remove the listener onAuthStateChanged when this use effect runs again, as it will run again once our user or username state changes
      unsubscribe();
    };
  }, [user, username]);
  return (
    <>
      <div
        className={
          props.active ? "signUpForm_container active" : "signUpForm_container"
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUp();
          }}
          className="signUpForm"
        >
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
