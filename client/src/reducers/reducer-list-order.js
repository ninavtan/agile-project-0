import initialData from '../components/initial-data';
import { UPDATE_LIST_ORDER } from '../components/actions/types';

const DEFAULT_STATE = initialData.columnOrder;

export default function listOrderReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case UPDATE_LIST_ORDER:
      return action.payload;
    default:
      return state;
  }
};