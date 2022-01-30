import { combineReducers } from "redux";
import listsReducer from "./reducer-lists";
import cardsReducer from "./reducer-cards";
import boardsReducer from "./reducer-boards";
import userReducer from "./reducer-user";

const rootReducer = combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer,
  user: userReducer
});

export default rootReducer;