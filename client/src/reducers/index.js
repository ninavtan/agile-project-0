import { combineReducers } from "redux";
import listOrderReducer from "./reducer-list-order";
import listsReducer from "./reducer-lists";
import tasksReducer from "./reducer-tasks"

const rootReducer = combineReducers({
  lists: listsReducer,
  listOrder: listOrderReducer,
  tasks: tasksReducer
});

export default rootReducer;