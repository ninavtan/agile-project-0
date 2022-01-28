import axios from 'axios';
import { UPDATE_LIST_ORDER, MOVE_CARD_WITHIN_LIST, MOVE_CARD_BETWEEN_LISTS, FETCH_BOARD, FETCH_BOARDS, FETCH_CARDS, ADD_NEW_LIST, ADD_NEW_CARD, UPDATE_LIST_TITLE } from './types';
const ROOT_URL = 'http://localhost:7000';

export const updateListOrder = (newListOrder) => dispatch =>{
  const boardId = '61ee0ddbf8f753e602f14f6b';  // hard code ID of first board in boards array for user Jango
  const url = `${ROOT_URL}/boards/${boardId}`;

  dispatch({ type: UPDATE_LIST_ORDER, payload: newListOrder })

  axios.put(url, {newListOrder: newListOrder})
  .then(function (response) {
    dispatch({ type: UPDATE_LIST_ORDER, payload: response.data.lists })
  })
  .catch(error => {
    console.log("There was an error with the updateListOrder action " + error);
  }); 

};

export const moveCardWithinList = (newList) => {
  return { 
    type: MOVE_CARD_WITHIN_LIST,
    payload: newList
  }
};

export const moveCardBetweenLists = (startList, finishList) => {
  return {
    type: MOVE_CARD_BETWEEN_LISTS,
    payload: [startList, finishList]
  }
};

export const fetchBoard = (boardId) => dispatch => {
  boardId = '61ee0ddbf8f753e602f14f6b';  // hard code ID of first board in boards array for user Jango
  const url = `${ROOT_URL}/boards/${boardId}`;
  axios.get(url)
    .then(function (response) {
      dispatch( { type: FETCH_BOARD, payload: response.data})
    })
    .catch(function (error) {
      console.log(error)
    });
};

export const fetchBoards = () => dispatch => {
  const url = `${ROOT_URL}/boards`;
  axios.get(url)
    .then(function (response) {
      dispatch({ type: FETCH_BOARDS, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fetchCards = (boardId) => dispatch => {
  boardId = '61ee0ddbf8f753e602f14f6b';  // hard code ID of first board in boards array for user Jango
  const url = `${ROOT_URL}/boards/${boardId}/cards`;
  axios.get(url)
  .then(function (response) {
    dispatch({ type: FETCH_CARDS, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const addNewList = (boardId, newListTitle) => dispatch => {
  const url = "http://localhost:7000/boards/" + boardId + "/list";  
  const newList = { title: newListTitle }
  
  axios.post(url, newList)
    .then(function (response) {
      dispatch({ type: ADD_NEW_LIST, payload: response.data })
    })
    .catch(error => {
      console.log("There was an error with the addList action" + error);
    }); 
};

export const addNewCard = (newCardTitle, listId) => dispatch => {
  const url = "http://localhost:7000/boards/board/" + listId + "/card";   
  
  axios.post(url, {cardTitle: newCardTitle})
    .then(function (response) {
      
      dispatch({ type: ADD_NEW_CARD, payload: response.data })
    })
    .catch(function (error) {
      console.log("There was an error with the addCard action" + error);
    })

};

export const updateListTitle = (list, newTitle) => {
  list.title = newTitle;
  return {
    type: UPDATE_LIST_TITLE,
    payload: list
  }
};
