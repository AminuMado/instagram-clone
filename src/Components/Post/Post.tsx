import "./Post.css";
import { Avatar } from "../Avatar/Avatar";
import { db } from "../../Utils/firebase";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { AddComment } from "../Comments/AddComment";
import { Comments } from "../Comments/Comments";
import { PostIcons } from "./PostIcons";
import { ActivePostContext } from "../../Context/ActivePostContext";

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
  const { setActivePost } = useContext(ActivePostContext);
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
    });
    return () => {
      unsub();
    };
  }, []);

  const Posts = posts.map((post: post) => {
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
        <Link to={`/Post/${post.id}`} onClick={() => setActivePost(post)}>
          <img className="post__image" src={post.imageUrl} alt="post" />
        </Link>
        <PostIcons postId={post.id}></PostIcons>
        <h4 className="post__text">
          <strong>{post.username}:</strong>
          {post.caption}
        </h4>
        <div className="post__comments">
          <Comments postId={post.id} />
        </div>
        <AddComment postId={post.id} />
      </div>
    );
  });
  return <div className="posts">{Posts}</div>;
};
