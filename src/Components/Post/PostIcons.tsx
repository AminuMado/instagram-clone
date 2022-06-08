import "./PostIcons.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Utils/firebase";
type PostIconsProps = {
  postId: string;
};
export const PostIcons = (props: PostIconsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const { user } = useContext(UserContext);
  const handleClick = async () => {
    setIsLiked(!isLiked);
    if (user) {
      const docRef = doc(db, "posts", `${props.postId}`);

      if (!isLiked) {
        updateDoc(docRef, {
          likedBy: arrayUnion(user.uid),
        });
      } else {
        updateDoc(docRef, {
          likedBy: arrayRemove(user.uid),
        });
      }
    }
  };
  useEffect(() => {
    const docRef = doc(db, "posts", `${props.postId}`);
    getDoc(docRef).then((doc) => {
      const data = doc.data()?.likedBy;
      setNumOfLikes(data.length);
      if (user) {
        data.forEach((element: string) => {
          if (element === user.uid) {
            setIsLiked(true);
          }
        });
      }
    });
  }, [isLiked, props.postId, user]);
  return (
    <div className="post__icons">
      <div className="likeIcon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isLiked ? "red" : "none"}
          viewBox="0 0 24 24"
          stroke={isLiked ? "red" : "currentcolor"}
          className="like_icon"
          onClick={handleClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </div>
      <div className="commentIcon">
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
      </div>

      <span className="num_of_likes">
        {numOfLikes}
        {numOfLikes > 1 ? ` likes` : ` like`}
      </span>
    </div>
  );
};
