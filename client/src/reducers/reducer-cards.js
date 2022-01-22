import initialData from '../components/initial-data';

const DEFAULT_STATE = initialData.cards;

export default function cardsReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    default:
      return state;
  }
};