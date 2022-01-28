import axios from 'axios';
import uniqid from 'uniqid';
import { UPDATE_LIST_ORDER, MOVE_CARD_WITHIN_LIST, MOVE_CARD_BETWEEN_LISTS, FETCH_BOARD, FETCH_BOARDS, ADD_NEW_LIST, ADD_NEW_CARD, UPDATE_LIST_TITLE, FETCH_LISTS, UPDATE_LIST } from './types';
const ROOT_URL = 'http://localhost:7000';

export const updateListOrder = (newListOrder) => {
  return {
    type: UPDATE_LIST_ORDER,
    payload: newListOrder
  }
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
  boardId = '61f07ffb92e6bb4bf1a7d269';  // hard code ID of first board in boards array for user Jango
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

export const fetchLists = (boardId) => dispatch => {
  const url = "http://localhost:7000/boards/" + boardId + "/lists"; 

  axios.get(boardId)
    .then(function (response) {
      dispatch({ type: FETCH_LISTS, payload: response.data });
    })
    .catch(function (error) {
      console.log("There was an error with the Fetch Lists action" + error);
    });
};

// Attempting backend connection //
// Working for backend.  Not rendering on frontend
export const addNewList = (boardId, newListTitle) => {
  const url = "http://localhost:7000/boards/" + boardId + "/list";  
  const newList = { title: newListTitle }
  
  axios.post(url, newList)
    .then(response => response)
    .catch(error => {
      console.log("There was an error with the addList action" + error);
    }); 
};

// Attempting backend connection //
//
export const addNewCard = (newCard, listId) => {
  const url = "http://localhost:7000/boards/board/" + listId + "/card";   

  const response = axios.post(url, newCard)
    .then(res => res)
    .catch(error => {
      console.log("There was an error with the addCard action" + error);
  });  

  return {
    type: ADD_NEW_CARD,
    payload: response
  };  
};

export const updateListTitle = (list, newTitle) => {
  list.title = newTitle;
  return {
    type: UPDATE_LIST_TITLE,
    payload: list
  }
};

// Use this action for moving a card between lists.  
// Include the list it is being moved to in the "updatedList" body
export const editList = (updatedList, listId) => {
  const url = "http://localhost:7000/boards/board/" + listId;

  const response = axios.put(url, updatedList)
    .then(res => res)
    .catch(error => {
      console.log("There was an error with the editList action" + error);
    })

  return {
    type: UPDATE_LIST,
    payload: response
  };  
}




