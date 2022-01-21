import initialData from '../components/initial-data';
import { ADD_NEW_CARD } from '../components/actions/types';

const DEFAULT_STATE = initialData.tasks;

export default function tasksReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    default:
      return state;
  }
};