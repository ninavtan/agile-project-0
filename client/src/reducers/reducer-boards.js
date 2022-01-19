import initialData from '../components/initial-data';
import { FETCH_BOARDS} from '../components/actions/types';

const DEFAULT_STATE = initialData;

export default function boardsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_BOARDS:
      return Object.assign({}, state, action.payload.data);
    

    default:
      return state;
  }
};