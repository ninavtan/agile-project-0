import axios from 'axios';
import _ from "lodash";
import { UPDATE_LIST_ORDER, MOVE_TASK_WITHIN_LIST, MOVE_TASK_BETWEEN_LISTS, FETCH_BOARDS, ADD_NEW_LIST } from './types';
const ROOT_URL = 'http://localhost:7000/';

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

export const fetchBoards = () => dispatch => {
  const url = ROOT_URL + 'boards';
  axios.get(url)
    .then(function (response) {
      dispatch({ type: FETCH_BOARDS, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addNewList = (newListName) => {
  const newListId = _.uniqueId();
  const newList = {
    [newListId]: {
      id: newListId,
      title: newListName,
      taskIds: [],
    }
  }
  console.log(newList);
  return {
    type: ADD_NEW_LIST,
    payload: newList
  }
}