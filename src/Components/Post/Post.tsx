import "./Post.css";
import { Avatar } from "../Avatar/Avatar";
import { db } from "../../Utils/firebase";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { AddComment } from "../Comments/AddComment";
import { Comments } from "../Comments/Comments";
import { PostIcons } from "./PostIcons";
import { ActivePostContext } from "../../Context/ActivePostContext";
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

export const Post = () => {
  const [posts, setPosts] = useState<post[]>([]);
  const { handleSetActivePost } = useContext(ActivePostContext);
  const { handleSetUserProfile } = useContext(UserProfileContext);

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
  const Posts = posts.map((post: post) => {
    return (
      <div className="post" key={post.id}>
        <div className="post__header">
          <div className="post__header_left">
            <Link to="/Profile" onClick={() => {}}>
              <Avatar
                src={post.avatar}
                handleClick={() => {
                  handleAvatarIconClick(
                    post.postBy,
                    post.username,
                    post.avatar
                  );
                }}
              />
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
        <Link to={`/Post/${post.id}`} onClick={() => handleSetActivePost(post)}>
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
