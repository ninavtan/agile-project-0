import { ADD_NEW_CARD, FETCH_BOARD } from '../components/actions/types';


const DEFAULT_STATE = [];



export default function cardsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case ADD_NEW_CARD:
      return {...state, [action.payload._id]: action.payload};
    

    default:
      return state; 
  }
};