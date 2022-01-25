import initialData from '../components/initial-data';
import { FETCH_BOARD, FETCH_BOARDS} from '../components/actions/types';

const DEFAULT_STATE = {
  currentBoard: initialData,
  allBoards: []
}

export default function boardsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_BOARD:
      return {...state, 'currentBoard': action.payload.data};

    case FETCH_BOARDS:
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
};