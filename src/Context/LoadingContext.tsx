import React, { createContext, useState } from "react";
type LoadingContextProviderProps = {
  children: React.ReactNode;
};
type LoadingContextType = {
  isLoading: boolean;
  handleSetIsLoading: (value: boolean) => void;
};
export const LoadingContext = createContext({} as LoadingContextType);

export const LoadingContextProvider = (props: LoadingContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSetIsLoading = (value: boolean) => {
    if (value) setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };
  return (
    <LoadingContext.Provider value={{ isLoading, handleSetIsLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
