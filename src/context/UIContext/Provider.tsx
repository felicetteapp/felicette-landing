import React, { PropsWithChildren } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { UIContext } from "./context";

export const UIContextProvider = ({ children }: PropsWithChildren) => {
  const { observer, addCallback } = useIntersectionObserver(() => {});
  return (
    <UIContext.Provider
      value={{ observer: observer.current, addObserverCallback: addCallback }}
    >
      {children}
    </UIContext.Provider>
  );
};
