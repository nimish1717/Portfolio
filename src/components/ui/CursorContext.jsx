"use client";

import { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [cursorType, setCursorType] = useState("default"); // default, pointer, view

  const cursorChangeHandler = (cursorType) => {
    setCursorType(cursorType);
  };

  return (
    <CursorContext.Provider value={{ cursorType, cursorChangeHandler }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
