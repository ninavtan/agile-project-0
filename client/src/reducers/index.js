import { combineReducers } from "redux";
import listOrderReducer from "./reducer-list-order";
import listsReducer from "./reducer-lists";
import cardsReducer from "./reducer-cards";
import boardsReducer from "./reducer-boards";

const rootReducer = combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
  listOrder: listOrderReducer,
  cards: cardsReducer
});

export default rootReducer;