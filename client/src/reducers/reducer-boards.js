import { FETCH_BOARD, FETCH_BOARDS, FETCH_USER_BOARDS} from '../components/actions/types';

const DEFAULT_STATE = {
  currentBoard: {},
  allBoards: []
}

export default function boardsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_BOARD:
      console.log(action.payload);
      return {...state, currentBoard: action.payload};

    case FETCH_BOARDS:
      return Object.assign({}, state, action.payload);

    case FETCH_USER_BOARDS:
      console.log(action.payload);
      action.payload.map(board => {
        debugger;
        return {...state, allBoards:board}
        // return Object.assign({}, state, {allBoards: board}
        
      })
      

    default:
      return state;
  }
};