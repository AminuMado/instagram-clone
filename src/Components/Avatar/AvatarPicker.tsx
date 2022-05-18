import "./AvatarPicker.css";
import avatar1 from "../../Assets/Images/Avatars/1.png";
import avatar2 from "../../Assets/Images/Avatars/2.png";
import avatar3 from "../../Assets/Images/Avatars/3.jpg";
import avatar4 from "../../Assets/Images/Avatars/4.jpg";
import avatar5 from "../../Assets/Images/Avatars/5.png";
import avatar6 from "../../Assets/Images/Avatars/6.png";
import avatar7 from "../../Assets/Images/Avatars/7.png";
import avatar8 from "../../Assets/Images/Avatars/8.png";
import avatar9 from "../../Assets/Images/Avatars/9.png";
import avatar10 from "../../Assets/Images/Avatars/10.png";
import avatar11 from "../../Assets/Images/Avatars/11.jpg";
import avatar12 from "../../Assets/Images/Avatars/12.png";
import avatar13 from "../../Assets/Images/Avatars/13.png";
import avatar14 from "../../Assets/Images/Avatars/14.jpg";
import avatar15 from "../../Assets/Images/Avatars/15.png";
import avatar16 from "../../Assets/Images/Avatars/16.png";
import avatar17 from "../../Assets/Images/Avatars/17.png";
import avatar18 from "../../Assets/Images/Avatars/18.png";
import avatar19 from "../../Assets/Images/Avatars/19.png";
import avatar20 from "../../Assets/Images/Avatars/20.png";
import avatar21 from "../../Assets/Images/Avatars/21.png";
import avatar22 from "../../Assets/Images/Avatars/22.png";
import avatar23 from "../../Assets/Images/Avatars/23.jpg";
import avatar24 from "../../Assets/Images/Avatars/24.jpg";
import avatar25 from "../../Assets/Images/Avatars/25.png";
import back from "../../Assets/Images/back.png";
import { useState } from "react";
type AvatarIconProps = {
  src: string;
};
type AvatarPickerProps = {
  active: boolean;
  setShowAvatarPicker: React.Dispatch<React.SetStateAction<boolean>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
};

export const AvatarPicker = (props: AvatarPickerProps) => {
  const [selected, setSelected] = useState(avatar1);
  const AvatarIcon = (props: AvatarIconProps) => {
    return (
      <img
        onClick={() => setSelected(props.src)}
        src={props.src}
        alt="avatar"
        className={
          selected === props.src ? "avatar_icon selected" : "avatar_icon"
        }
      ></img>
    );
  };
  return (
    <div
      className={
        props.active
          ? "avatar_picker_container_wrapper active"
          : "avatar_picker_container_wrapper"
      }
    >
      <div className="avatar_picker_container">
        <AvatarIcon src={selected} />
        <div className="avatars">
          <AvatarIcon src={avatar1} />
          <AvatarIcon src={avatar2} />
          <AvatarIcon src={avatar3} />
          <AvatarIcon src={avatar4} />
          <AvatarIcon src={avatar5} />
          <AvatarIcon src={avatar6} />
          <AvatarIcon src={avatar7} />
          <AvatarIcon src={avatar8} />
          <AvatarIcon src={avatar9} />
          <AvatarIcon src={avatar10} />
          <AvatarIcon src={avatar11} />
          <AvatarIcon src={avatar12} />
          <AvatarIcon src={avatar13} />
          <AvatarIcon src={avatar14} />
          <AvatarIcon src={avatar15} />
          <AvatarIcon src={avatar16} />
          <AvatarIcon src={avatar17} />
          <AvatarIcon src={avatar18} />
          <AvatarIcon src={avatar19} />
          <AvatarIcon src={avatar20} />
          <AvatarIcon src={avatar21} />
          <AvatarIcon src={avatar22} />
          <AvatarIcon src={avatar23} />
          <AvatarIcon src={avatar24} />
          <AvatarIcon src={avatar25} />
        </div>
        <img
          onClick={() => {
            props.setShowAvatarPicker(false);
            props.setAvatar(selected);
          }}
          className="back_button"
          src={back}
          alt="x"
        />
      </div>
    </div>
  );
};
