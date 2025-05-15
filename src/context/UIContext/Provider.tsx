import React, { PropsWithChildren } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { UIContext } from "./context";

export const UIContextProvider = ({ children }: PropsWithChildren) => {
  const { observer, addCallback, observerReady } = useIntersectionObserver(
    () => {}
  );
  return (
    <UIContext.Provider
      value={{
        observer: observer.current,
        addObserverCallback: addCallback,
        observerReady,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
