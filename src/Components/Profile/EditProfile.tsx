import { useContext, useEffect, useState } from "react";
import { AvatarPicker } from "../Avatar/AvatarPicker";
import { Avatar } from "../Avatar/Avatar";
import "./EditProfile.css";
import { UserContext } from "../../Context/UserContext";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../Utils/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";

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
  const clearAll = () => {
    props.toggle(false);
    setShowAvatarPicker(false);
  };
  const updateUserProfile = async () => {
    if (!user) return; // guard clause ensures that user is defined moving forward

    //so we want to first change the username and display profile picture
    // then we have to change the display name on all posts and comments made by the user with the new updated name and profile photo

    // update the name and photo
    const auth = getAuth();
    if (auth.currentUser) {
      if (username.trim() === "") return;
      updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: avatar,
      })
        .then(async () => {
          // Profile updated!
          // ...
          console.log("updated");
          setUser(auth.currentUser);
          localStorage.setItem("currentUser", JSON.stringify(user)); // save a user in localStorage

          //Now we have to change all the username and posts made with the old username and photo
          //first of all we grab all posts the user has made and update them with the new name and photo url
          const q = query(
            collection(db, "posts"),
            where("postBy", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (post) => {
            const docRef = doc(db, "posts", post.id);
            // Set the "username and avatar" field of the post to the updated userName and photourl
            await updateDoc(docRef, {
              username: user.displayName,
              avatar: user.photoURL,
            });
          });
          // now we update all the comments
          const qAllPosts = query(collection(db, "posts"));
          const qAllPostsSnapshot = await getDocs(qAllPosts);
          qAllPostsSnapshot.forEach(async (post) => {
            const postData = post.data();
            const updatedComments: comment[] = postData.comments.map(
              (comment: comment) => {
                if (comment.userId === user.uid) {
                  return { ...comment, username: user.displayName };
                } else return comment;
              }
            );
            const docRef = doc(db, "posts", post.id);
            await updateDoc(docRef, {
              comments: updatedComments,
            });
          });
        })
        .catch((error) => {
          // An error occurred
          // ...
          alert(error.message);
        });
    }
  };
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
