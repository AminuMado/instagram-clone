import React, { createContext, useState } from "react";
type UserProfileContextProviderProps = {
  children: React.ReactNode;
};
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
  id: string;
};
type UserProfileContextType = {
  userProfile: ProfileUser;
  handleSetUserProfile: (user: ProfileUser) => void;
};
export const UserProfileContext = createContext({} as UserProfileContextType);

export const UserProfileContextProvider = (
  props: UserProfileContextProviderProps
) => {
  /* Local Storage */
  // we check local storage for an existing userprofile if you exist we set you to the userprofile state else we set it to an empty template
  // why add this? well without a local storage state when ever you refresh the page it defaults to the empty template and throws errors as we
  // make various calls to the backend.
  const getUserProfile = (() => {
    let currentUserProfile: ProfileUser = {
      id: "",
      username: "",
      avatar: "",
      posts: [],
    };
    const value = localStorage.getItem("currentUserProfile");
    if (typeof value === "string") {
      currentUserProfile = JSON.parse(value);
    }
    return currentUserProfile;
  })();

  const [userProfile, setUserProfile] = useState<ProfileUser>(getUserProfile);
  const handleSetUserProfile = (user: ProfileUser) => {
    localStorage.setItem("currentUserProfile", JSON.stringify(user)); // save the currentUserProfile in localStorage
    setUserProfile(user);
  };
  return (
    <UserProfileContext.Provider value={{ userProfile, handleSetUserProfile }}>
      {props.children}
    </UserProfileContext.Provider>
  );
};
