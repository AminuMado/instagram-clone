import React, { createContext, useState } from "react";
type ActivePostContextProviderProps = {
  children: React.ReactNode;
};
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
type ActivePostContextType = {
  activePost: post;
  setActivePost: React.Dispatch<React.SetStateAction<post>>;
};

export const ActivePostContext = createContext({} as ActivePostContextType);

export const ActivePostContextProvider = (
  props: ActivePostContextProviderProps
) => {
  const [activePost, setActivePost] = useState<post>({
    id: "",
    caption: "",
    imageUrl: "",
    username: "",
    avatar: "",
    comments: [],
  });

  return (
    <ActivePostContext.Provider value={{ activePost, setActivePost }}>
      {props.children}
    </ActivePostContext.Provider>
  );
};
