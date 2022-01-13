import { UPDATE_LIST_ORDER, MOVE_TASK_WITHIN_LIST, MOVE_TASK_BETWEEN_LISTS } from './types';

export const updateListOrder = (newListOrder) => {
  return {
    type: UPDATE_LIST_ORDER,
    payload: newListOrder
  }
};

export const moveTaskWithinList = (newList) => {
  return { 
    type: MOVE_TASK_WITHIN_LIST,
    payload: newList
  }
};

export const moveTaskBetweenLists = (startList, finishList) => {
  return {
    type: MOVE_TASK_BETWEEN_LISTS,
    payload: [startList, finishList]
  }
};