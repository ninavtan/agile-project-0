import { USER_LOGIN } from "../components/actions/types";
import { USER_LOGOUT } from "../components/actions/types";
// const DEFAULT_STATE = {
//   _id: "61edc0a6aedb0b9422cf6ddd",
//   username: "Jango",
// };

const DEFAULT_STATE = {isLoggedIn: false};

export default function userReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case USER_LOGIN:
      console.log(action.payload);
      return { ...state, ...action.payload, isLoggedIn : true }

    case USER_LOGOUT:
      console.log('The user is logged out!' + action.payload);
      return {...state, ...action.payload, isLoggedIn: false}

    default:
      return state;
  }
};