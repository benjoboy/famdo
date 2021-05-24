import { useContext, createContext } from "react";

export const StateContext = createContext({
  isLoggedIn: false,
  localeId: "en-US",
  firstName: "",
  lastName: "",
  email: "",
  avatar: null,
  teamId: 1,
});

export function useAppState() {
  return useContext(StateContext);
}
