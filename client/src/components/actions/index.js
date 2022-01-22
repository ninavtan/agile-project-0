import axios from 'axios';
import uniqid from 'uniqid';
import { useSelector } from 'react-redux';
import { UPDATE_LIST_ORDER, MOVE_CARD_WITHIN_LIST, MOVE_CARD_BETWEEN_LISTS, FETCH_BOARDS, ADD_NEW_LIST, ADD_NEW_CARD, UPDATE_LIST_TITLE } from './types';
const ROOT_URL = 'http://localhost:7000/';

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
    title: newCardTitle,
    id: uniqid('card-')
  };

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
