import { MOVE_CARD_WITHIN_LIST, MOVE_CARD_BETWEEN_LISTS, ADD_NEW_LIST, UPDATE_LIST_TITLE, ADD_NEW_CARD, FETCH_BOARD, UPDATE_LIST_ORDER, DELETE_CARD, DELETE_LIST} from '../components/actions/types';
import { normalize, schema } from 'normalizr';
import _ from 'lodash';

const DEFAULT_STATE = {
  entries: {},
  order: [],
};

const listsSchema = new schema.Entity('lists', undefined, { idAttribute: '_id' });

export default function listsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case MOVE_CARD_WITHIN_LIST:
      return {
        order: state.order,
        entries: { ...state.entries, [state.entries[action.payload._id]._id]: action.payload}
      }
    
    case MOVE_CARD_BETWEEN_LISTS:
      return {
        order: state.order,
        entries: { ...state.entries, 
          [state.entries[action.payload[0]._id]._id]: action.payload[0],
          [state.entries[action.payload[1]._id]._id]: action.payload[1]}
      }
    
    case ADD_NEW_LIST:
      
      return {
        order: [...state.order, action.payload._id],
        entries: {...state.entries, [action.payload._id]: action.payload} 
      }

    case ADD_NEW_CARD:      
      return {
          order: state.order,
          entries: {...state.entries, [action.payload.list]:{...state.entries[action.payload.list], card: [...state.entries[action.payload.list].card, action.payload]}}
        }
      
    case UPDATE_LIST_TITLE:
      return {
        order: state.order,
        entries: {...state.entries, [action.payload.id]: action.payload}
      }
    
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
    
    case DELETE_LIST:      
      const listRemovedId = action.payload._id;
      const filteredListOrder = state.order.filter(list => list !== listRemovedId)
      const filteredListEntries = _.filter(state.entries, list => list._id !== listRemovedId)
      const normalizedFilteredLists = normalize(filteredListEntries, [listsSchema]);

      return {
      order: filteredListOrder,
      entries: { ...normalizedFilteredLists.entities.lists }
      }
    
      
    // Delete card action.type
    case DELETE_CARD:
      const listId = action.payload.list;
      const filteredCardIds = state.entries[listId].card.filter(card => card._id !== action.payload._id);
    
      return {
        order: state.order,
        entries: {...state.entries, [listId]: {...state.entries[listId], card: filteredCardIds}}
      }

    default:
      return state;
  }
};