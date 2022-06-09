import { Avatar } from "../Avatar/Avatar";
import { Navbar } from "../Navbar/Navbar";
import "./Profile.css";

type ProfileProps = {
  user: ProfileUser;
};
type ProfileUser = {
  id: string;
  username: string;
  avatar: string;
  posts: ProfilePost[];
};
type ProfilePost = {
  id: string;
  numOfComments: number;
  numOflikes: number;
  img: string;
};
export const Profile = (props: ProfileProps) => {
  const postsCount = props.user.posts.length;
  const posts = props.user.posts.map((post) => {
    return (
      <div className="profile__posts_postCard" key={post.id}>
        <div className="postCard_info">
          <div className="postCard_info_icons">
            <div className="postCard_info_likes">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentcolor"
                className="like_icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>{post.numOflikes}</span>
            </div>
            <div className="postCard_info_comments">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="comment_icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>{post.numOfComments}</span>
            </div>
          </div>
        </div>
        <img src={post.img} alt="post"></img>
      </div>
    );
  });
  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile__userInfo_container">
          <Avatar src={props.user.avatar} handleClick={() => {}} />
          <div className="profile__userInfo">
            <div className="profile__userInfo_top">
              <h2>{props.user.username}</h2>
            </div>
            <div className="profile__userInfo_bottom">
              <div className="profile__userInfo_postsCount">
                <h2>{postsCount}</h2>
                <p>{postsCount > 1 ? "posts" : "post"}</p>
              </div>
              <button className="profile_editprofile_btn">Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="profile__tabs">
          <h3>Posts</h3>
          <h3>Saved</h3>
        </div>
        <div className="profile__posts">{posts}</div>
      </div>
    </>
  );
};
