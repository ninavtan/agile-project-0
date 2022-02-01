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
      // debugger;
      // action.payload.map(board => {
        // debugger;
        // return [...state.allBoards, action.payload]
        // return {...state, allBoards: [...action.payload]}
        // need to add action.payload to the allBoards array
        // return Object.assign({}, state, {allBoards: board}

        return {
          ...state,
            allBoards: [
              ...action.payload
            ]
        }
      // console.log(typeof state);
      //   // const newState = state.allBoards.slice();
      //   // newState.push(action.payload);
      //   // return newState;

      //   return state;
        
      // })
      

    default:
      return state;
  }
};