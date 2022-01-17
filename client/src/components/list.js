import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Form , Button} from 'react-bootstrap';
import useOnClickOutside from 'use-onclickoutside';

import Task from './task';

const List = (props) => {

  const [showAddCardInput, setAddCardInput] = React.useState(false);
  const addCardClickHandler = () => setAddCardInput(true);
  const cancelAddCard = () => setAddCardInput(false);

  const AddCardInput = () => {
    
    const ref = React.useRef(null);
    useOnClickOutside(ref, cancelAddCard);
    
    return (
      <Form ref={ref}>
        <StyledForm type="text"  placeholder="Enter a title for this card..." />
        <StyledButton variant='primary'>Add Card</StyledButton>
        <CancelButton variant='outline-danger' onClick={cancelAddCard}> X </CancelButton>
      </Form>
    );
  }

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <Container 
          {...provided.draggableProps} 
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <Droppable 
            droppableId={props.column.id}
            type="task"
            key={props.column.id}
          >
            {(provided) => (
              <TaskList 
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          { showAddCardInput ? <AddCardInput autofocus/> : 
            <AddCardButton onClick={addCardClickHandler}>+ Add a Card</AddCardButton>}
        </Container>
      )}
    </Draggable>
  );
}

export default List;


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
min-height: 80px;
margin: 8px;
margin-top: 0px;
width: 282px;
padding: 8px;
padding-bottom: 46px;
font-family: sans-serif;
color: #ebecf0;
background-color:white;
&:placeholder-shown {
  padding-bottom: 46px;
}
`


const AddCardButton = styled.div`
  margin: 0px 10px;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  font-family: sans-serif;
  color: #172b4d;
  background-color:#ebecf0;
  &:hover {
    background-color: lightgray;
    cursor:pointer;
  }

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const Container = styled.div`

  width: 300px;
  margin: 28px 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: #ebecf0;
  font-family: sans-serif;
  transition: filter 0.2s ease;
  filter: ${props => (props.isDragging ? 'drop-shadow(0px 0px 10px #172b4d90)' : 'none')};
`;
const Title = styled.h5`
  font-weight:800;  
  padding: 12px;
  color: #172b4d;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const TaskList = styled.div`
  padding: 0px 8px;
  min-height: 20px;
`;