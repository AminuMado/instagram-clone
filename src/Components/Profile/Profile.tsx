import { Avatar } from "../Avatar/Avatar";
import avatar from "../../Assets/Images/Avatars/7.png";

import "./Profile.css";

export const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__userInfo_container">
        <Avatar src={avatar} handleClick={() => {}} />
        <div className="profile__userInfo">
          <div className="profile__userInfo_top">
            <h2>The Man Himself</h2>
            <button>Edit Profile</button>
          </div>
          <div className="profile__userInfo_bottom">
            <div className="profile__userInfo_postsCount">
              <h2>1</h2>
              <p>posts</p>
            </div>
            <div className="profile__userInfo_followersCount">
              <h2>1</h2>
              <p>followers</p>
            </div>{" "}
            <div className="profile__userInfo_followingCount">
              <h2>1</h2>
              <p>following</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile__tabs">
        <h3>Posts</h3>
        <h3>Saved</h3>
      </div>
      <div className="profile__posts">
        <div className="profile__posts_postCard"></div>
      </div>
    </div>
  );
};
