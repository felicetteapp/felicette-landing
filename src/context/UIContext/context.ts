import { createContext } from "react";

export interface UIContextValue {
  observer: IntersectionObserver;
  addObserverCallback: (callback: IntersectionObserverCallback) => void;
}

export const UIContext = createContext<UIContextValue>({
  addObserverCallback: () => {},
  observer: new IntersectionObserver(() => {}),
});
