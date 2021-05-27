export const stateReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("user", action.user);
      return {
        ...state,
        isLoggedIn: true,
        name: action.user.name,
        surname: action.user.surname,
        email: action.user.email,
      };
    case "LOGOUT":
      console.log("logout");
      sessionStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        name: "",
        surname: "",
        email: "",
      };
    case "SELECT_FILTER":
      return {
        ...state,
        selectedFilter: action.filter,
      };
    case "CHECK_SESSION":
      const loggedUser = sessionStorage.getItem("user");
      if (loggedUser)
        return {
          ...state,
          isLoggedIn: true,
          name: loggedUser.name,
          surname: loggedUser.surname,
          email: loggedUser.email,
        };
      else
        return {
          ...state,
        };
    default:
      return state;
  }
};
