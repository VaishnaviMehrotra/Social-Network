// import {
//     LOGIN_USER,
//     LOGOUT_USER,
//     FETCH_USER,
//     DELETE_USER,
//     REGISTER_USER,
//     UPDATE_USER,
//     USER_ERROR,
//   } from "./constants";
  
  const initialState = {
    user: null,
    authenticated: false,
    loading: true,
    error: null,
  };
  function UserReducer(state, action) {
    switch (action.type) {
      case "LOGIN_USER":
      case "FETCH_USER":
      case "REGISTER_USER":
        return {
          ...state,
          authenticated: true,
          user: action.payload,
          loading: false,
        };
      case "UPDATE_USER":
        return { ...state, user: action.payload };
      case "USER_ERROR":
        return { ...state, error: action.payload };
      case "LOGOUT_USER":
        return { ...state, authenticated: false, user: null };
      default:
        return state;
    }
  }

  export { initialState, UserReducer };