import { MOVE_CARD_WITHIN_LIST, MOVE_CARD_BETWEEN_LISTS, ADD_NEW_LIST, UPDATE_LIST_TITLE} from '../components/actions/types';
import initialData from '../components/initial-data';

const DEFAULT_STATE = initialData.lists;

export default function listsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case MOVE_CARD_WITHIN_LIST:
      return { ...state, [action.payload.id]: action.payload }
    
    case MOVE_CARD_BETWEEN_LISTS:
      return {...state, [action.payload[0].id]: action.payload[0], [action.payload[1].id]: action.payload[1]};
    
    case ADD_NEW_LIST:
      return {...state, [action.payload.id]: action.payload};
      
    case UPDATE_LIST_TITLE:
      return {...state, [action.payload.id]: action.payload};

    default:
      return state;
  }
};