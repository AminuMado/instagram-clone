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
  const [user, setUser] = useState<{} | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
