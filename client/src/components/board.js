import React from 'react';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Row,Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import List from './list';
import { updateListOrder, moveCardWithinList, moveCardBetweenLists, addNewList, fetchBoard } from './actions';
import useOnClickOutside from 'use-onclickoutside';

const Board = (props) => {
  const lists = useSelector(state => state.lists.entries);
  const listOrder = useSelector(state => state.lists.order);
  const allCards = useSelector(state => state.cards);
  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch(fetchBoard(props._id));
  }, [dispatch, props._id]);

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

      dispatch(updateListOrder(newListOrder));
      return;
    };

    const startList = lists[source.droppableId];
    const finishList = lists[destination.droppableId];

    //Moving a card within the same list
    if(startList === finishList){
      const newCardIds = Array.from(startList.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
  
      const newList = {
        ...startList,
        cardIds: newCardIds,
      }

      dispatch(moveCardWithinList(newList));
      return;
    }

    //Moving a card to a different list
    const startListCardIds = Array.from(startList.cardIds);
    startListCardIds.splice(source.index, 1);
    const newStartList = {
      ...startList,
      cardIds:startListCardIds,
    };

    const finishListCardIds = Array.from(finishList.cardIds);
    finishListCardIds.splice(destination.index, 0, draggableId);
    const newFinishList = {
      ...finishList,
      cardIds: finishListCardIds,
    };

    dispatch(moveCardBetweenLists(newStartList, newFinishList));
    return;
  }

  //New List Input
  const currentBoardID = "61f07ffb92e6bb4bf1a7d269"; // Board Id is hardcoded. Need to update.
  const [showAddListInput, setAddListInput] = React.useState(false);
  const addListClickHandler = () => setAddListInput(true);
  const cancelAddList = () => setAddListInput(false);

  const AddListInput = () => {
    
    const ref = React.useRef(null);
    useOnClickOutside(ref, cancelAddList);
    const [newListName, setNewListName] = useState('');
    
    const submitNewList = (e) => {
      e.preventDefault();
      dispatch(addNewList(currentBoardID, newListName));  //Board Id is hardcoded.  Need to update
      setAddListInput(false);
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
            
          <CancelButton variant='outline-danger' onClick={cancelAddList}>
             X </CancelButton>
        </Form>
      </ListContainer>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          <Row className="flex-row flex-nowrap">
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
  )
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