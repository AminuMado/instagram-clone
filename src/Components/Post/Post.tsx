import "./Post.css";
import img_Src from "../../Assets/Images/wallpaper5.jpg";
import { Avatar } from "../Avatar/Avatar";
import avatar from "../../Assets/Images/Avatars/7.png";
import { useState } from "react";
export const Post = () => {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header_left">
          <Avatar src={avatar} handleClick={() => {}} />
          <h3>The Man Himself</h3>
        </div>
        <div className="post__header_right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="three_dots_icon"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
      </div>
      <img className="post__image" src={img_Src} alt="post" />
      <div className="post__icons">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isLiked ? "red" : "none"}
          viewBox="0 0 24 24"
          stroke={isLiked ? "red" : "currentcolor"}
          className="like_icon"
          onClick={() => setIsLiked(!isLiked)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
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
        <span className="num_of_likes">1 like</span>
      </div>

      <h4 className="post__text">
        <strong>The Man Himself:</strong>First Post
      </h4>

      <form className="post__comment">
        <input
          aria-label="Add a comment"
          className="post__comment_input"
          type="text"
          name="add-comment"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="post__comment_button" type="button">
          Post
        </button>
      </form>
    </div>
  );
};
