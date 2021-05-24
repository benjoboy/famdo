import React, { useReducer } from "react";
import { StateContext } from "./state.context";
import { stateReducer } from "./state.reducer";

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, { isLoggedIn: false });

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
