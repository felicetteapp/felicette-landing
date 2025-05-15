import { useContext } from "react";
import { UIContext } from "../context/UIContext/context";

export const useUIContext = () => useContext(UIContext);
