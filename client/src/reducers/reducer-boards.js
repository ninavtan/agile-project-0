import { FETCH_BOARD, FETCH_BOARDS, ADD_NEW_LIST} from '../components/actions/types';

const DEFAULT_STATE = {
  currentBoard: {},
  allBoards: []
}

export default function boardsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_BOARD:
      return {...state, currentBoard: action.payload};

    case FETCH_BOARDS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};