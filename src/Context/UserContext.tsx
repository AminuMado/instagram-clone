import React, { createContext, useState } from "react";
type UserContextProviderProps = {
  children: React.ReactNode;
};
type UserContextType = {
  user: {} | null;
  setUser: React.Dispatch<React.SetStateAction<{} | null>>;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = (props: UserContextProviderProps) => {
  /* Local Storage */
  // we check local storage for an existing user if you exist we set you to the user saved else we set user to null
  const getUser = (() => {
    let currentUser: string | null = null;
    const value = localStorage.getItem("currentUser");
    if (typeof value === "string") {
      currentUser = JSON.parse(value);
    }
    return currentUser;
  })();

  const [user, setUser] = useState<{} | null>(getUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
