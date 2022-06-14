import "./Post.css";
import { Avatar } from "../Avatar/Avatar";
import { colRef } from "../../Utils/firebase";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { query, where, getDocs, orderBy } from "firebase/firestore";
import { AddComment } from "../Comments/AddComment";
import { Comments } from "../Comments/Comments";
import { PostIcons } from "./PostIcons";
import { ActivePostContext } from "../../Context/ActivePostContext";
import { UserProfileContext } from "../../Context/UserProfileContext";
import { DeletePost } from "./DeletePost";
import { LoadingContext } from "../../Context/LoadingContext";
import { UserContext } from "../../Context/UserContext";

type post = {
  id: string;
  caption: string;
  imageUrl: string;
  username: string;
  avatar: string;
  comments: comment[];
  postBy: string;
  likedBy: [];
};
type comment = {
  text: string;
  username: string;
  userId: string;
};

export const Post = () => {
  const [posts, setPosts] = useState<post[]>([]);
  const { handleSetActivePost } = useContext(ActivePostContext);
  const { handleSetUserProfile } = useContext(UserProfileContext);
  const { handleSetIsLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const handleAvatarIconClick = async (
    userId: string,
    userName: string,
    userAvatar: string
  ) => {
    type ProfileUser = {
      id: string;
      username: string;
      avatar: string;
      posts: post[];
    };
    //set loading animation
    handleSetIsLoading(true);

    //Getting the Posts of the User
    const posts: post[] = [];
    const q = query(colRef, where("postBy", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const post = { ...(data as post), id: data.id };

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
    handleSetIsLoading(false); //disable loading animation
  };

  useEffect(() => {
    let posts: post[] = [];
    const unsubscribe = onSnapshot(
      query(colRef, orderBy("timestamp", "desc")),
      (snapshot) => {
        posts = snapshot.docs.map((doc) => ({
          ...(doc.data() as post),
          id: doc.id,
        }));
        setPosts(posts);
      }
    );
    return unsubscribe();
  }, []);

  const Posts = posts.map((post: post) => {
    const isUserPost = post.postBy === user?.uid ? true : false;
    return (
      <div className="post" key={post.id}>
        <div className="post__header">
          <div className="post__header_left">
            <Link
              to="/Profile"
              onClick={() => {
                handleAvatarIconClick(post.postBy, post.username, post.avatar);
              }}
            >
              <Avatar src={post.avatar} handleClick={() => {}} />
            </Link>
            <h3>{post.username}</h3>
          </div>
          {isUserPost && (
            <div className="post__header_right">
              <DeletePost postId={post.id} />
            </div>
          )}
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
