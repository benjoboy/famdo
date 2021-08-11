export const stateReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("user", action.user);
      return {
        ...state,
        userId: action.user._id,
        isLoggedIn: true,
        name: action.user.name,
        surname: action.user.surname,
        email: action.user.email,
        families: action.user.families,
        family: action.family,
      };
    case "LOGOUT":
      sessionStorage.clear();

      return {
        ...state,
        userId: "",
        isLoggedIn: false,
        name: "",
        surname: "",
        email: "",
        families: "",
        family: null,
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
