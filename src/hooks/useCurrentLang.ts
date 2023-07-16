import { useState, useEffect } from "react";
const getLangFromPathname = (pathname: string) => {
  const parts = pathname.split("/");
  if (parts.length > 2) {
    return parts[1];
  }
  return "en";
};
export const useCurrentLang = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    if (typeof window === "undefined") {
      setCurrentLang("en");
    } else {
      setCurrentLang(
        getLangFromPathname(window ? window?.location?.pathname || "" : "")
      );
    }
  }, []);

  return currentLang;
};
