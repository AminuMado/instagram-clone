import { useContext, useEffect, useState } from "react";
import { AvatarPicker } from "../Avatar/AvatarPicker";
import { Avatar } from "../Avatar/Avatar";
import "./EditProfile.css";
import { UserContext } from "../../Context/UserContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import { db } from "../../Utils/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { query, getDocs } from "firebase/firestore";
import { UserProfileContext } from "../../Context/UserProfileContext";
import { LoadingContext } from "../../Context/LoadingContext";

type ProfileUser = {
  id: string;
  username: string;
  avatar: string;
  posts: post[];
};
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

type EditProfileProps = {
  active: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
};
export const EditProfile = (props: EditProfileProps) => {
  const [username, setUsername] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { handleSetUserProfile } = useContext(UserProfileContext);
  const { handleSetIsLoading } = useContext(LoadingContext);
  const clearAll = () => {
    props.toggle(false);
    setShowAvatarPicker(false);
  };
  const updateUserProfile = async () => {
    if (!user) return; // guard clause ensures that user is defined moving forward
    if (auth.currentUser) {
      if (username.trim() === "") return;
      updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: avatar,
      })
        .then(async () => {
          handleSetIsLoading(true);
          setUser(auth.currentUser);
          localStorage.setItem("currentUser", JSON.stringify(user)); // save a user in localStorage
          //Now we have to change all the username and posts made with the old username and photo
          //first of all we grab all posts the user has made and update them with the new name and photo url

          const qAllPosts = query(collection(db, "posts"));
          const qAllPostsSnapshot = await getDocs(qAllPosts);
          const userPosts: post[] = [];
          qAllPostsSnapshot.forEach(async (post) => {
            const docRef = doc(db, "posts", post.id);
            const postData = post.data();
            if (postData.postBy === user.uid) {
              //This saves the posts the user made
              const post = { ...(postData as post), id: postData.id };
              userPosts.push(post);
              //This updates the the doc on the database
              // get the updated comments
              const updatedComments: comment[] = postData.comments.map(
                (comment: comment) => {
                  if (comment.userId === user.uid) {
                    return { ...comment, username: user.displayName };
                  } else return comment;
                }
              );
              await updateDoc(docRef, {
                username: user.displayName,
                avatar: user.photoURL,
                comments: updatedComments,
              });
            } else {
              const updatedComments: comment[] = postData.comments.map(
                (comment: comment) => {
                  if (comment.userId === user.uid) {
                    return { ...comment, username: user.displayName };
                  } else return comment;
                }
              );
              await updateDoc(docRef, {
                comments: updatedComments,
              });
            }
          });

          //Setting UserProfile
          if (user.displayName && user.photoURL) {
            const userProfile: ProfileUser = {
              id: user.uid,
              username: user.displayName,
              avatar: user.photoURL,
              posts: userPosts,
            };
            handleSetUserProfile(userProfile);
          }
          //After everything has is done... Cleanup
          handleSetIsLoading(false);
          clearAll();
          setUsername("");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  //UseEffect to set the signed in user's avatar
  useEffect(() => {
    if (user?.photoURL) {
      setAvatar(user.photoURL);
    }
  }, [user?.photoURL]);

  return (
    <div className="editprofile">
      <div
        onClick={clearAll}
        className={
          props.active ? "editprofile_overlay active" : "editprofile_overlay"
        }
      ></div>
      <div
        className={
          props.active
            ? "editprofile_container active"
            : "editprofile_container"
        }
      >
        <div className="editprofile_avatar_container">
          <label htmlFor="avatar">Avatar</label>
          <Avatar
            src={avatar}
            handleClick={() => {
              setShowAvatarPicker(true);
            }}
          />
        </div>
        <div className="editprofile_username_container">
          <label htmlFor="username">userName</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Bobba Fett"
            value={username}
          ></input>
        </div>
        <div className="editprofile_buttons">
          <button onClick={updateUserProfile}>update</button>
        </div>
        <button onClick={clearAll} className="close_btn">
          Close x
        </button>
      </div>
      <AvatarPicker
        active={showAvatarPicker}
        setShowAvatarPicker={setShowAvatarPicker}
        setAvatar={setAvatar}
      />
    </div>
  );
};
