"use client";

import { createContext, useContext, useState, useCallback } from "react";

const CursorContext = createContext({
  cursorType: "default",
  cursorText: "",
  cursorChangeHandler: () => {},
  cursorTextHandler: () => {},
});

export function CursorProvider({ children }) {
  const [cursorType, setCursorType] = useState("default");
  const [cursorText, setCursorText] = useState("");

  const cursorChangeHandler = useCallback((type) => {
    setCursorType(type);
  }, []);

  const cursorTextHandler = useCallback((text) => {
    setCursorText(text);
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorType,
        cursorText,
        cursorChangeHandler,
        cursorTextHandler,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
