import { User } from "firebase/auth";
import React, { createContext, useState } from "react";
type UserContextProviderProps = {
  children: React.ReactNode;
};
type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = (props: UserContextProviderProps) => {
  /* Local Storage */
  // we check local storage for an existing user if you exist we set you to the user saved else we set user to null
  const getUser = (() => {
    let currentUser: User | null = null;
    const value = localStorage.getItem("currentUser");
    if (typeof value === "string") {
      currentUser = JSON.parse(value);
    }
    return currentUser;
  })();

  const [user, setUser] = useState<User | null>(getUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
