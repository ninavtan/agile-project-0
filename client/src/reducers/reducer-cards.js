import initialData from '../components/initial-data';
import { ADD_NEW_CARD } from '../components/actions/types';

const DEFAULT_STATE = initialData.cards;

export default function cardsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    default:
      return state;
  }
};