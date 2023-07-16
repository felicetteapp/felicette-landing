import { useState, useEffect } from "react";
const getLangFromPathname = (pathname: string) => {
  const parts = pathname.split("/");
  if (parts.length > 2) {
    return parts[1];
  }
  return "en";
};
export const useCurrentLang = () => {
  const [currentLang, setCurrentLang] = useState(
    getLangFromPathname(window?.location?.pathname || "")
  );

  useEffect(() => {
    setCurrentLang(getLangFromPathname(window?.location?.pathname || ""));
  }, []);

  return currentLang;
};
