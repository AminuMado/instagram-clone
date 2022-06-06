import "./Post.css";
import { Avatar } from "../Avatar/Avatar";
import { db } from "../../Utils/firebase";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { UserContext } from "../../Context/UserContext";

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

export const Post = () => {
  const [posts, setPosts] = useState<post[]>([]);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(UserContext);
  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    //we want to add a comment to the database
    // comment must be an object containing all the fields required
    // need to have access to the specific db we are adding to
    e.preventDefault();
    if (comment.trim() === "") return;

    // v0bFsLnWDkj1De9iP2BE has comment
    // r2NCqcXSmOQjZ3Zx8KDu empty array comment
    if (user) {
      const docRef = doc(db, "posts", "r2NCqcXSmOQjZ3Zx8KDu");

      updateDoc(docRef, {
        comments: arrayUnion({
          id: "dummyId",
          text: "second Comment from db",
          timestamp: " 6 June 2022 at 00:00:00 UTC+1",
          username: "The man himself",
        }),
      });
      //  {
      //   timestamp: serverTimestamp(),
      //   caption: caption,
      //   imageUrl: url,
      //   username: user.displayName, // note this is passed as a prop
      //   avatar: user.photoURL,
      //  }
    }
  };

  useEffect(() => {
    //collection ref
    const colRef = collection(db, "posts");
    let posts: post[] = [];
    const unsub = onSnapshot(colRef, (snapshot) => {
      posts = snapshot.docs.map((doc) => ({
        ...(doc.data() as post),
        id: doc.id,
      }));
      setPosts(posts);
      console.log(posts);
    });
    return () => {
      unsub();
    };
  }, []);

  const Posts = posts.map((post: post) => {
    const comments = post.comments.map((comment) => (
      <h6 className="post__comment" key={comment.id}>
        <strong>{comment.username}:</strong>
        {comment.text}
      </h6>
    ));

    return (
      <div className="post" key={post.id}>
        <div className="post__header">
          <div className="post__header_left">
            <Link to="/Profile">
              <Avatar src={post.avatar} handleClick={() => {}} />
            </Link>
            <h3>{post.username}</h3>
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
        <Link to={`/Post/${post.id}`}>
          <img className="post__image" src={post.imageUrl} alt="post" />
        </Link>
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
          <strong>{post.username}:</strong>
          {post.caption}
        </h4>
        <div className="post__comments">{comments}</div>
        <form className="post__add_comment" onSubmit={addComment}>
          <input
            aria-label="Add a comment"
            className="post__add_comment_input"
            type="text"
            name="add-comment"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="post__add_comment_button" type="submit">
            Post
          </button>
        </form>
      </div>
    );
  });
  return <div className="posts">{Posts}</div>;
};
