import "./PostModal.css";
import img_Src from "../../Assets/Images/wallpaper5.jpg";
import back_Src from "../../Assets/Images/back1.png";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";
import avatar from "../../Assets/Images/Avatars/7.png";
import { useState } from "react";
import { PostIcons } from "./PostIcons";
type post = {
  id: string;
  caption: string;
  imageUrl: string;
  username: string;
  avatar: string;
  comments: comment[];
};
type comment = {
  text: string;
  username: string;
  id: string;
};
type PostModalProps = {
  post: post;
};
export const PostModal = (props: PostModalProps) => {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="postModal">
      <div className="postModal__container">
        <div className="postModal__image_container">
          <img
            className="postModal__image"
            src={props.postImageUrl}
            alt="post"
          />
        </div>
        <div className="postModal__details_container">
          <div className="postModal__header">
            <div className="postModal__header_left">
              <Avatar src={props.postAvatar} handleClick={() => {}} />
              <h3>{props.postUsername}</h3>
            </div>
            <div className="postModal__header_right">
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
          <PostIcons postId={props.postId}></PostIcons>
          <div className="postModal__comments">
            <h4 className="postModal__comment">
              <strong>The Man Himself:</strong>First Post
            </h4>
          </div>

          <form className="postModal__addComment">
            <input
              aria-label="Add a comment"
              className="postModal__addComment_input"
              type="text"
              name="add-comment"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="postModal__addComment_button" type="button">
              Post
            </button>
          </form>
        </div>
      </div>

      <img
        onClick={() => navigate(-1)}
        className="back_icon"
        src={back_Src}
        alt="back_icon"
      />
    </div>
  );
};
