import { MOVE_TASK_WITHIN_LIST, MOVE_TASK_BETWEEN_LISTS } from '../components/actions/types';
import initialData from '../components/initial-data';

const DEFAULT_STATE = initialData.columns;

export default function listsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case MOVE_TASK_WITHIN_LIST:
      return { ...state, [action.payload.id]: action.payload }
    case MOVE_TASK_BETWEEN_LISTS:
      return {...state, [action.payload[0].id]: action.payload[0], [action.payload[1].id]: action.payload[1]};
    default:
      return state;
  }
};