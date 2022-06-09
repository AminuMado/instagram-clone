import { useContext } from "react";
import { query, where, getDocs, collection } from "firebase/firestore";
import { UserProfileContext } from "../Context/UserProfileContext";
import { db } from "./firebase";

export const handleAvatarIconClick = async (
  userId: string,
  userAvatar: string,
  userName: string
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { handleSetUserProfile } = useContext(UserProfileContext);
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
