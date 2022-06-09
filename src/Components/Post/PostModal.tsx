import "./PostModal.css";
import back_Src from "../../Assets/Images/back1.png";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";
import { PostIcons } from "./PostIcons";
import { AddComment } from "../Comments/AddComment";
import { Comments } from "../Comments/Comments";
import { db } from "../../Utils/firebase";
import { collection } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { UserProfileContext } from "../../Context/UserProfileContext";

type post = {
  id: string;
  caption: string;
  imageUrl: string;
  username: string;
  avatar: string;
  comments: comment[];
  postBy: string;
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
  const navigate = useNavigate();
  const { handleSetUserProfile } = useContext(UserProfileContext);
  const handleAvatarIconClick = async (
    userId: string,
    userName: string,
    userAvatar: string
  ) => {
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
    //Getting the Posts of the User
    const posts: ProfilePost[] = [];
    const q = query(collection(db, "posts"), where("postBy", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const post: ProfilePost = {
        id: data.id,
        numOfComments: data.comments.length,
        numOflikes: data.likedBy.length,
        img: data.imageUrl,
      };
      posts.push(post);
    });

    //Setting UserProfile
    const userProfile: ProfileUser = {
      id: userId,
      username: userName,
      avatar: userAvatar,
      posts: posts,
    };
    handleSetUserProfile(userProfile);
  };

  return (
    <div className="postModal">
      <div className="postModal__container">
        <div className="postModal__image_container">
          <img
            className="postModal__image"
            src={props.post.imageUrl}
            alt="post"
          />
        </div>
        <div className="postModal__details_container">
          <div className="postModal__header">
            <div className="postModal__header_left">
              <Link
                to="/Profile"
                onClick={() => {
                  handleAvatarIconClick(
                    props.post.postBy,
                    props.post.username,
                    props.post.avatar
                  );
                }}
              >
                <Avatar src={props.post.avatar} handleClick={() => {}} />
              </Link>
              <h3>{props.post.username}</h3>
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
          <PostIcons postId={props.post.id}></PostIcons>
          <div className="postModal__comments">
            <Comments postId={props.post.id} />
          </div>
          <AddComment postId={props.post.id} />
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
