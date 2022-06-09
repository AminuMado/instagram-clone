import React, { createContext, useState } from "react";
type UserProfileContextProviderProps = {
  children: React.ReactNode;
};
type user = {
  id: string;
  username: string;
  avatar: string;
  posts: [];
};

type UserProfileContextType = {
  userProfile: user;
  setUserProfile: React.Dispatch<React.SetStateAction<user>>;
};
export const UserProfileContext = createContext({} as UserProfileContextType);

export const UserProfileContextProvider = (
  props: UserProfileContextProviderProps
) => {
  const [userProfile, setUserProfile] = useState<user>({
    id: "",
    username: "",
    avatar: "",
    posts: [],
  });

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {props.children}
    </UserProfileContext.Provider>
  );
};
