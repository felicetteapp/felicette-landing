import { useCallback, useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const [observerReady, setObserverReady] = useState(false);
  const callbacksRef = useRef<IntersectionObserverCallback[]>([callback]);

  const observerRef = useRef<IntersectionObserver>();

  const addCallback = useCallback((callback: IntersectionObserverCallback) => {
    callbacksRef.current.push(callback);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((...callbackprops) => {
      callbacksRef.current.forEach((cb) => {
        cb(...callbackprops);
      });
    }, options);

    setObserverReady(true);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    observer: observerRef,
    addCallback,
    observerReady,
  };
};
