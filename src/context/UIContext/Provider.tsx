import React, { PropsWithChildren, useCallback, useEffect } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { UIContext } from "./context";
import Lenis from "lenis";

export const UIContextProvider = ({ children }: PropsWithChildren) => {
  const { observer, addCallback, observerReady } = useIntersectionObserver(
    () => {}
  );

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

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
