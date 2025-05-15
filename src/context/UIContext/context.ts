import { createContext } from "react";

export interface UIContextValue {
  observer: IntersectionObserver | undefined;
  addObserverCallback: (callback: IntersectionObserverCallback) => void;
  observerReady: boolean;
}

export const UIContext = createContext<UIContextValue>({
  addObserverCallback: () => {},
  observer: undefined,
  observerReady: false,
});
