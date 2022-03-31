import axios from 'axios';

import { UPDATE_LIST_ORDER, MOVE_CARD_WITHIN_LIST, MOVE_CARD_BETWEEN_LISTS, FETCH_BOARD, FETCH_BOARDS, FETCH_CARDS, ADD_NEW_LIST, ADD_NEW_CARD, UPDATE_LIST_TITLE, DELETE_CARD, DELETE_LIST, DELETE_BOARD, DELETE_COMMENT, USER_LOGIN, USER_LOGOUT, FETCH_USER_BOARDS } from './types';

// const ROOT_URL = 'http://localhost:7000';
const ROOT_URL = 'https://agile-mello.herokuapp.com/';

export const updateListOrder = (boardId, newListOrder) => dispatch =>{
   // const boardId = '61ee0ddbf8f753e602f14f6b';  // hard code ID of first board in boards array for user Jango
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

export const moveCardWithinList = (newList) => dispatch => {
  const listId = newList._id;
  const url = "http://localhost:7000/boards/board/" + listId;   
  
  dispatch({type: MOVE_CARD_WITHIN_LIST, payload: newList});

  // As written, this action successfully sends the new card order to the back end, and successfully shows the correct order in the UI. However, when I send the payload to the reducer, the cards are no longer rendered out... so we can revisit this later if need be.

  axios.put(url, {cards: newList.card})
  // .then(function (response) {
    //   dispatch({ type: MOVE_CARD_WITHIN_LIST, payload: response.data })
    // })
    .catch(function (error) {
      console.log("There was an error with the move card within list action" + error);
    })
};

export const moveCardBetweenLists = (boardId, startList, finishList, movedCard) => dispatch => {
  const startListUrl = "http://localhost:7000/boards/board/" + startList._id;
  const finishListUrl = "http://localhost:7000/boards/board/" + finishList._id;
  // const boardId = '61ee0ddbf8f753e602f14f6b';  // hard code ID of first board in boards array for user Jango
  const cardActivityUrl = `${ROOT_URL}/boards/${boardId}/${finishList._id}/${movedCard._id}`;
  // console.log(cardActivityUrl);
  // router.put("/boards/:board/:list/:card", (req, res, next) => {
  
  movedCard.list = finishList._id;

  dispatch({type: MOVE_CARD_BETWEEN_LISTS, payload: [startList, finishList, movedCard]});

  axios.put(startListUrl, {cards: startList.card})
  .catch(function (error) {
      console.log("There was an error with the move card between lists action" + error);
    });

  axios.put(finishListUrl, {cards: finishList.card})
  .catch(function (error) {
      console.log("There was an error with the move card between lists action" + error);
    });


  movedCard.activity = { change: `Card moved from ${startList.title} to ${finishList.title}`, date: new Date() }

  axios.put(cardActivityUrl, {
    list: movedCard.list,
    cardTitle: movedCard.cardTitle,
    description: movedCard.description,
    cardLabel: movedCard.cardLabel,
    activity: movedCard.activity
  })
  .catch(function (error) {
    console.log('There was an error updating the card activity when moving bewteen lists: ', error)
  })
};

export const fetchBoard = (boardId) => dispatch => {

  // boardId = '61ef03734c98c4fee5c6706b';  // hard code ID of first board in boards array for user Jango

// boardId = '61ee0ddbf8f753e602f14f6b';  // hard code ID of first board in boards array for user Jango


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

export const fetchUserBoards = (userId) => dispatch => {
  const url = `${ROOT_URL}/${userId}`;
  axios.get(url)
    .then(function (response) {
      dispatch({ type: FETCH_USER_BOARDS, payload: response.data });
    })
    .catch(function (error) {
      console.log(`There was an error fetching ${userId} boards` + error);
    });

}

export const fetchCards = (boardId) => dispatch => {

  // boardId = '61ee0ddbf8f753e602f14f6b';  // hard code ID of first board in boards array for user Jango

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
  // boardId = '61ee0ddbf8f753e602f14f6b';  // hard code ID of first board in boards array for user Jango
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

export const updateListTitle = (list, newTitle) => dispatch => {
  const url = `${ROOT_URL}/boards/board/${list._id}`;
  list.title = newTitle;

  axios.put(url, {
    title: list.title,
    color: list.color,
    card: list.card
    })
    .then(function (response) {
      dispatch( { type: UPDATE_LIST_TITLE, payload: list })
    })
    .catch(function (error) {
      console.log("There was an error with the updateListTitle action: ", error);
    })
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

export const userLogout = (user) => dispatch => {
  dispatch( {type: USER_LOGOUT, payload: user})
};

export const deleteCard = (cardId) => dispatch => {
  const url = "http://localhost:7000/boards/board/list/" + cardId;  
  const request = axios.delete(url); 

  request
  .then(function (response) {     
    console.log("The delete card response is " + response.data)
    dispatch({ type: DELETE_CARD, payload: response.data })
  })
  .catch(function (error) {
    console.log("There was an error with the deleteCard action" + error);
  });   
      

};

export const deleteList = (boardId, listId) => dispatch => {
   const url = "http://localhost:7000/boards/" + boardId + "/" + listId;

  axios.delete(url)
    .then(function (response) {
      console.log(response.data)
      dispatch({ type: DELETE_LIST, payload: response.data })
    })
    .catch(function (error) {
      console.log("There was an error with the deleteList action " + error);
    }); 
};

export const deleteBoard = (boardId) => dispatch => {
  const url = "http://localhost:7000/boards/" + boardId;

  axios.delete(url)
    .then(function (response) {
      dispatch({ type: DELETE_BOARD, payload: response.data })
    })
    .catch(function (error) {
      console.log("There was an error with the deleteBoard action" + error);
    }); 
};

export const deleteComment = (cardId, commentId) => dispatch => {
  const url = "http://localhost:7000/boards/board/list/" + cardId + "/" + commentId;

  axios.delete(url)
    .then(function (response) {
      dispatch({ type: DELETE_COMMENT, payload: response.data })
    })
    .catch(function (error) {
      console.log("There was an error with the deleteComment action" + error);
    }); 
};

