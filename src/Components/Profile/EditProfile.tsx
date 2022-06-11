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
  return (
    <div className="editprofile">
      <div className="editprofile_overlay"></div>
      <div className="editprofile_container">
        <div className="editprofile_avatar_container">
          <label htmlFor="avatar">Avatar</label>
          <Avatar
            src={avatar}
            handleClick={() => {
              setShowAvatarPicker(true);
            }}
          />
        </div>
        <label htmlFor="username">UserName</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          type="text"
          placeholder="Bobba Fett"
          value={username}
        ></input>
        <div className="editprofile_buttons">
          <button>Update</button>
        </div>
        <button onClick={() => props.toggle(false)} className="close_btn">
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
