export const stateReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.user);
      return {
        ...state,
        isLoggedIn: true,
        name: action.user.name,
        surname: action.user.surname,
        email: action.user.email,
      };
    case "LOGOUT":
      sessionStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        authToken: undefined,
      };
    case "SELECT_FILTER":
      return {
        ...state,
        selectedFilter: action.filter,
      };
    case "CHECK_SESSION":
      const loggedUserToken = sessionStorage.getItem("jwtToken");
      if (loggedUserToken)
        return {
          ...state,
          isLoggedIn: true,
          authToken: loggedUserToken,
        };
      else
        return {
          ...state,
        };
    default:
      return state;
  }
};
