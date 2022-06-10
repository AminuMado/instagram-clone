import React, { createContext, useState } from "react";
type LoadingContextProviderProps = {
  children: React.ReactNode;
};
type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export const LoadingContext = createContext({} as LoadingContextType);

export const LoadingContextProvider = (props: LoadingContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
