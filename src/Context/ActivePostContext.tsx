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
  handleSetActivePost: (post: post) => void;
};

export const ActivePostContext = createContext({} as ActivePostContextType);

export const ActivePostContextProvider = (
  props: ActivePostContextProviderProps
) => {
  /* Local Storage */
  // we check local storage for an existing activepost if you exist we set you to the activepost state else we set it to an empty template
  const getActivePost = (() => {
    let currentActivePost: post = {
      id: "",
      caption: "",
      imageUrl: "",
      username: "",
      avatar: "",
      comments: [],
    };
    const value = localStorage.getItem("currentActivePost");
    if (typeof value === "string") {
      currentActivePost = JSON.parse(value);
    }
    return currentActivePost;
  })();
  const [activePost, setActivePost] = useState<post>(getActivePost);
  const handleSetActivePost = (post: post) => {
    localStorage.setItem("currentActivePost", JSON.stringify(post)); // save the activePost in localStorage
    setActivePost(post);
  };

  return (
    <ActivePostContext.Provider value={{ activePost, handleSetActivePost }}>
      {props.children}
    </ActivePostContext.Provider>
  );
};
