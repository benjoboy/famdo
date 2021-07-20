import { useContext, createContext } from "react";

export const StateContext = createContext({
  isLoggedIn: false,
  localeId: "en-US",
  name: "",
  surname: "",
  email: "",
  avatar: null,
  family: null,
});

export function useAppState() {
  return useContext(StateContext);
}
