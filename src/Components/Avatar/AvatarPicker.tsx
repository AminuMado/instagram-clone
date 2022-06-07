import "./AvatarPicker.css";
import avatar_Src from "../../Assets/Images/Avatars/1.png";
import back from "../../Assets/Images/back.png";
import { useEffect, useState } from "react";
import { storage } from "../../Utils/firebase";
import { ref, getDownloadURL } from "firebase/storage";

type AvatarIconProps = {
  src: string;
};
type AvatarPickerProps = {
  active: boolean;
  setShowAvatarPicker: React.Dispatch<React.SetStateAction<boolean>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
};

export const AvatarPicker = (props: AvatarPickerProps) => {
  const [selected, setSelected] = useState<string>(avatar_Src);
  const [avatars, setAvatars] = useState<string[] | null>(null);
  useEffect(() => {
    const avatarsFirebase: string[] = [];
    for (let i = 1; i <= 25; i++) {
      const avatarRef = ref(storage, `avatars/${i}.png`);
      getDownloadURL(avatarRef)
        .then((url) => avatarsFirebase.push(url))
        .catch((error) => console.log(error.message));
    }
    setAvatars(avatarsFirebase);
  }, []);
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

  if (avatars) {
    const avatarIcons = avatars.map((avatar, index) => {
      return <AvatarIcon key={index} src={avatar} />;
    });

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
          <div className="avatars">{avatarIcons}</div>
          <img
            onClick={() => {
              props.setShowAvatarPicker(false);
              props.setAvatar(selected);
            }}
            className="back_icon"
            src={back}
            alt="x"
          />
        </div>
      </div>
    );
  } else return <div>Loading</div>;
};
