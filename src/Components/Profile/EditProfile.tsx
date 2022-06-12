import { useState } from "react";
import { AvatarPicker } from "../Avatar/AvatarPicker";
import { Avatar } from "../Avatar/Avatar";
import "./EditProfile.css";

type EditProfileProps = {
  active: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
};
export const EditProfile = (props: EditProfileProps) => {
  const [username, setUsername] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [avatar, setAvatar] = useState("");
  const clearAll = () => {
    props.toggle(false);
    setShowAvatarPicker(false);
  };
  return (
    <div className="editprofile">
      <div
        onClick={clearAll}
        className={
          props.active ? "editprofile_overlay active" : "editprofile_overlay"
        }
      ></div>
      <div
        className={
          props.active
            ? "editprofile_container active"
            : "editprofile_container"
        }
      >
        <div className="editprofile_avatar_container">
          <label htmlFor="avatar">Avatar</label>
          <Avatar
            src={avatar}
            handleClick={() => {
              setShowAvatarPicker(true);
            }}
          />
        </div>
        <div className="editprofile_username_container">
          <label htmlFor="username">userName</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Bobba Fett"
            value={username}
          ></input>
        </div>
        <div className="editprofile_buttons">
          <button>update</button>
        </div>
        <button onClick={clearAll} className="close_btn">
          Close x
        </button>
      </div>
      <AvatarPicker
        active={showAvatarPicker}
        setShowAvatarPicker={setShowAvatarPicker}
        setAvatar={setAvatar}
      />
    </div>
  );
};
