import React from 'react';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Row,Col, Form, Button, CloseButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import List from './list';
import { updateListOrder, moveCardWithinList, moveCardBetweenLists, addNewList, fetchBoard, fetchCards } from './actions';
import useOnClickOutside from 'use-onclickoutside';
import NavBar from './navbar.js';
import { useNavigate, Outlet } from "react-router-dom";
import { Link, useParams } from "react-router-dom";



const Board = (props) => {
  const lists = useSelector(state => state.lists.entries);
  const listOrder = useSelector(state => state.lists.order);
  const allCards = useSelector(state => state.cards);
  
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  let history = useNavigate();
  let params = useParams();

  let currentBoardID = params.boardId;

  useEffect(() => {
    // debugger;
    dispatch(fetchBoard(params.boardId));
    dispatch(fetchCards(params.boardId));
  }, [dispatch, params.boardId]);

  
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    };
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    };
  
    if (type === 'list') {
      const newListOrder = Array.from(listOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      dispatch(updateListOrder(currentBoardID, newListOrder));
      return;
    };
    const startList = lists[source.droppableId];
    const finishList = lists[destination.droppableId];
    
    //Moving a card within the same list
    if(startList === finishList){
      const listId = startList._id;
      const newCardIds = Array.from(lists[listId].card);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, allCards[draggableId]);
      const newList = {
        ...startList,
        card: newCardIds,
      }

      dispatch(moveCardWithinList(newList));
      return;
    }

    //Moving a card to a different list
    const startListCards = Array.from(lists[startList._id].card);
    const movedCard = startListCards[source.index];
    startListCards.splice(source.index, 1);
    const newStartList = {
      ...startList,
      card:startListCards,
    };

    const finishListCards = Array.from(lists[finishList._id].card);
    finishListCards.splice(destination.index, 0, allCards[draggableId]);
    const newFinishList = {
      ...finishList,
      card: finishListCards,
    };

    dispatch(moveCardBetweenLists(currentBoardID, newStartList, newFinishList, movedCard));
    return;
  }

  //New List Input

  const [showAddListInput, setAddListInput] = React.useState(false);
  const addListClickHandler = () => setAddListInput(true);
  const cancelAddList = () => setAddListInput(false);

  const AddListInput = () => {
    
    const ref = React.useRef(null);
    useOnClickOutside(ref, cancelAddList);
    const [newListName, setNewListName] = useState('');
    
    const submitNewList = (e) => {
      e.preventDefault();
      dispatch(addNewList(currentBoardID, newListName));
      // Formerly hard coded board ID.
      setAddListInput(false);
    }

    const redirectToLogin = () => {
      history('/login');
    }
 
    return (
      <ListContainer>
        <Form ref={ref} onSubmit={submitNewList}>
          <Form.Group>
            <StyledForm 
              required
              type="name"
              placeholder="Enter list title..." 
              onChange={event => setNewListName(event.target.value)}
            />
          </Form.Group>
          <StyledButton 
          variant='primary'
          type='submit'>
            Add List</StyledButton>
            
          <CloseButton onClick={cancelAddList} />
        </Form>
      </ListContainer>
  )}

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} >
        <Droppable 
          droppableId='all-lists' 
          direction="horizontal" 
          type="list"
        >
          {provided =>(
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Row className="flex-row flex-nowrap" >
            {Array.from(listOrder).map((listId, index) => {
              const list = lists[listId];
              const cards = list.card.map((cardId) => allCards[cardId]);
              
              return (
                  <Col >
                    <List key={list._id} list={list} cards={cards} index={index}/>
                  </Col>
              );
            })}
            </Row>
            {provided.placeholder}
            <Col>
              { showAddListInput ? <AddListInput /> : 
                <AddListButton onClick={addListClickHandler}>+ Add another list</AddListButton>}
            </Col>
          </Container>
        )}    
        </Droppable>
      </DragDropContext>
  </>)
};

export default Board;


const Container = styled.div`
display: flex;
justify-content: left;
margin: 30px;
background-color:#95bae7
`

const StyledButton = styled(Button)`
margin: 8px;
`

const CancelButton = styled(Button)`
border: none;
box-shadow: none;
color: #172b4d;
font-weight: 900;
&:active {
  background-color:black;
}
&:hover {
  background-color:#ebecf0;
  color: #dc3545
}
`

const StyledForm = styled(Form.Control)`
border: 1px solid lightgrey;
border-radius: 5px;
min-height: 40px;
margin:  10px;
margin-bottom: 10px;
width: 282px;
padding: 8px;
font-family: sans-serif;
color: #ebecf0;
background-color:white;

`
const ListContainer = styled.div`

  width: 300px;
  margin: 28px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: #ebecf0;
  font-family: sans-serif;
`;

const AddListButton = styled.div`
  width: 300px;
  height: 54px;
  margin: 28px;
  padding: 12px;
  border: 1px solid #4e8edb;
  border-radius: 5px;
  background-color: #4e8edb;
  font-family: sans-serif;
  
  color: white;
  &:hover {
    background-color: #0d6efd;
    cursor:pointer;
  }
  vertical-align: center;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`