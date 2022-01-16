import { combineReducers } from "redux";
import listOrderReducer from "./reducer-list-order";
import listsReducer from "./reducer-lists";
import tasksReducer from "./reducer-tasks";
import boardsReducer from "./reducer-boards";

const rootReducer = combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
  listOrder: listOrderReducer,
  tasks: tasksReducer
});

export default rootReducer;