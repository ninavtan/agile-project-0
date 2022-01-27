import { MOVE_CARD_WITHIN_LIST, MOVE_CARD_BETWEEN_LISTS, ADD_NEW_LIST, UPDATE_LIST_TITLE, ADD_NEW_CARD, FETCH_BOARD, UPDATE_LIST_ORDER} from '../components/actions/types';
import { normalize, schema } from 'normalizr';

const DEFAULT_STATE = {
  entries: {},
  order: []
};

const listsSchema = new schema.Entity('lists', undefined, { idAttribute: '_id' });

export default function listsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case MOVE_CARD_WITHIN_LIST:
      return {
        order: state.order,
        entries: { ...state.entries, [action.payload.id]: action.payload}
      }
    
    case MOVE_CARD_BETWEEN_LISTS:
      return {
        order: state.order,
        entries: {...state.entries, [action.payload[0].id]: action.payload[0], [action.payload[1].id]: action.payload[1]}
      }
    
    case ADD_NEW_LIST:
      return {
        order: [...state.order, action.payload.id],
        entries: {...state.entries, [action.payload.id]: action.payload} 
      }
      
    case UPDATE_LIST_TITLE:
      return {
        order: state.order,
        entries: {...state.entries, [action.payload.id]: action.payload}
      }

    // case ADD_NEW_CARD:
    //   return {
    //     order: state.order,
    //     entries: {...state.entries, [action.payload[1].id]: action.payload[1]} 
    //   }
    
    case UPDATE_LIST_ORDER:
      return {
        order: action.payload,
        entries: state.entries
      }
    
    case FETCH_BOARD:
      const normalizedLists = normalize(action.payload.lists, [listsSchema]);
      return {
        order: [ ...normalizedLists.result],
        entries: { ...normalizedLists.entities.lists }
      }

    default:
      return state;
  }
};