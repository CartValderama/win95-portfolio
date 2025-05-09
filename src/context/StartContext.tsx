import React, { createContext, useContext, useState } from "react";
import { StartType } from "../lib/type";

type StartContextProviderProps = {
  children: React.ReactNode;
};

const StartContext = createContext<StartType | null>(null);

const StartContextProvider = ({ children }: StartContextProviderProps) => {
  const [start, setStart] = useState(false);
  const transition = { duration: 0.5, delay: 0.5 };

  return (
    <StartContext.Provider value={{ start, setStart, transition }}>
      {children}
    </StartContext.Provider>
  );
};

export function useStart() {
  const context = useContext(StartContext);

  if (context === null) {
    throw new Error("useStart must be used within a StartContextProvider");
  }

  return context;
}

export default StartContextProvider;
