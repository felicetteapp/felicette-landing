import { useCallback, useEffect, useRef } from "react";

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const callbacksRef = useRef<IntersectionObserverCallback[]>([callback]);

  const observerRef = useRef<IntersectionObserver>(
    new IntersectionObserver((...callbackprops) => {
      callbacksRef.current.forEach((cb) => {
        cb(...callbackprops);
      });
    }, options)
  );

  const addCallback = useCallback((callback: IntersectionObserverCallback) => {
    callbacksRef.current.push(callback);
  }, []);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    observer: observerRef,
    addCallback,
  };
};
