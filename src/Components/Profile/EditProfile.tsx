import { useState } from "react";
import { AvatarPicker } from "../Avatar/AvatarPicker";
import "./EditProfile.css";
export const EditProfile = () => {
  const [username, setUsername] = useState("");
  return (
    <div className="editprofile_overlay">
      <div className="editprofile_wrapper">
        <div className="editprofile_input">
          <label htmlFor="username">UserName</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Bobba Fett"
            value={username}
          ></input>
        </div>
        {/* <AvatarPicker active={true} setShowAvatarPicker={false}/> */}
        {/* avatarpicker for the avatar */}
        {/* update button */}
        {/* close modal or cancel button */}
      </div>
    </div>
  );
};
