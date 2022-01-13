import initialData from '../components/initial-data';

const DEFAULT_STATE = initialData.tasks;

export default function tasksReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    default:
      return state;
  }
};