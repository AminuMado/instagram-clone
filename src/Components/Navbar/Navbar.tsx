import "./Navbar.css";
import settings_Src from "../../Assets/Images/settings.png";
import back_Src from "../../Assets/Images/back1.png";
import upload_Src from "../../Assets/Images/newpost.png";
import { useContext, useState } from "react";
import Switcher from "../../Utils/Switcher";
import { Link } from "react-router-dom";
import { ImageUpload } from "../Post/NewPost";
import { signOut } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import { UserContext } from "../../Context/UserContext";
import { db } from "../../Utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserProfileContext } from "../../Context/UserProfileContext";

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

export const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { handleSetUserProfile } = useContext(UserProfileContext);
  const handleProfileClick = async () => {
    // set the current profile to the default user profile
    // to get user posts you need to get the posts array from the collection
    // filter the ones that were posted by the user
    // with those posts get the images and numof likes and comments
    // create a post type with image,numoflikes & numofComments as an objec and then set user to be that

    if (user && user.displayName && user.photoURL) {
      //Getting the Posts of the User
      const posts: post[] = [];
      const q = query(
        collection(db, "posts"),
        where("postBy", "==", user?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const post = { ...(data as post), id: data.id };

        posts.push(post);
      });

      //Setting UserProfile
      const userProfile: ProfileUser = {
        id: user.uid,
        username: user.displayName,
        avatar: user.photoURL,
        posts: posts,
      };
      handleSetUserProfile(userProfile);
    }
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("currentUser");
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };
  return (
    <nav className="navbar">
      <Link to="/Home">
        <h1>Star Wars World</h1>
      </Link>
      <div>
        <img
          onClick={() => setShowNewPost(!showNewPost)}
          src={upload_Src}
          alt="newpost_icon"
        />
        <img
          onClick={() => setShowOptions(true)}
          src={settings_Src}
          alt="menu_icon"
        />
      </div>

      <ImageUpload active={showNewPost} />

      <nav
        className={showOptions ? "navbar__options active" : "navbar__options"}
      >
        <Link to="/Profile" onClick={handleProfileClick}>
          <span>Profile</span>
        </Link>
        <Link to="/" onClick={handleSignOut}>
          <span>Sign out</span>
        </Link>
        <img
          onClick={() => setShowOptions(false)}
          className="back_icon"
          src={back_Src}
          alt="back_icon"
        ></img>
        <Switcher />
      </nav>
    </nav>
  );
};
