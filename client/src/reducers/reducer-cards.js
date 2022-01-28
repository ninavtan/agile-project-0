import { ADD_NEW_CARD, FETCH_CARDS } from '../components/actions/types';
import { normalize, schema } from 'normalizr';


const DEFAULT_STATE = {};

const cardsSchema = new schema.Entity('cards', undefined, { idAttribute: '_id' });


export default function cardsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case ADD_NEW_CARD:
      return {...state, [action.payload._id]: action.payload};
    
    case FETCH_CARDS:
      const normalizedCards = normalize(action.payload, [cardsSchema]);
      return { ...normalizedCards.entities.cards }

    default:
      return state; 
  }
};