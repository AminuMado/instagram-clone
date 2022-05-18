import "./Post.css";
import img_Src from "../../Assets/Images/wallpaper5.jpg";
import { Avatar } from "../Avatar/Avatar";
import avatar from "../../Assets/Images/Avatars/7.png";
export const Post = () => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar src={avatar} handleClick={() => {}} />
        <h3>UserName</h3>
      </div>
      <img className="post__image" src={img_Src} alt="post" />
      <h4 className="post__text">
        <strong>The Man Himself:</strong>First Post
      </h4>
    </div>
  );
};
