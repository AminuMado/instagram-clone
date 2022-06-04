import React, { createContext, useState } from "react";
type UserContextProviderProps = {
  children: React.ReactNode;
};
export const UserContext = createContext({});

export const UserContextProvider = (props: UserContextProviderProps) => {
  const [user, setUser] = useState<{} | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
