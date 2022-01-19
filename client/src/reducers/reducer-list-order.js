import initialData from '../components/initial-data';
import { UPDATE_LIST_ORDER, ADD_NEW_LIST} from '../components/actions/types';

const DEFAULT_STATE = initialData.listOrder;

export default function listOrderReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case UPDATE_LIST_ORDER:
      return action.payload;
    case ADD_NEW_LIST:
      return [...state, action.payload.id];
    default:
      return state;
  }
};