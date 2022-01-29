import axios from 'axios';
import uniqid from 'uniqid';
import { UPDATE_LIST_ORDER, MOVE_CARD_WITHIN_LIST, MOVE_CARD_BETWEEN_LISTS, FETCH_BOARD, FETCH_BOARDS, ADD_NEW_LIST, ADD_NEW_CARD, UPDATE_LIST_TITLE, USER_LOGIN } from './types';
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
  boardId = '61edc0a6aedb0b9422cf6ddf';  // hardcore first board in boards array for user Jango
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

export const addNewList = (newListTitle) => {
  //The below is just a placeholder until we hook up the backend
  const newListId = uniqid('list-');
  const newList = {
      id: newListId,
      title: newListTitle,
      cardIds: [],
    }
  return {
    type: ADD_NEW_LIST,
    payload: newList
  }
}

export const addNewCard = (newCardTitle, listForNewCard) => {
  
  //The below is just a placeholder until we hook up the backend
  const cardToAdd = {
    cardTitle: newCardTitle,
    id: uniqid('card-')
  };
  //the code below should be able to stay the same after 
  const newCardIds = [
    ...listForNewCard.cardIds,
    cardToAdd.id,
  ]
  const newList = {
    ...listForNewCard,
    cardIds: newCardIds,
  }

  return {
    type: ADD_NEW_CARD,
    payload: [cardToAdd, newList]
  }
}

export const updateListTitle = (list, newTitle) => {
  list.title = newTitle;
  return {
    type: UPDATE_LIST_TITLE,
    payload: list
  }
};

export const userLogin = (username, password) => dispatch => {
  const url = `${ROOT_URL}/login`;

  const data = {
    username: username,
    password: password
  }
  
    axios.post(url, data)
      .then(function (response) {
        console.log(response.data.board);
        dispatch({type: USER_LOGIN, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
}

// export const userLogout = 