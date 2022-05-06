import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Form , Button, CloseButton, Toast, Row, Col} from 'react-bootstrap';
import useOnClickOutside from 'use-onclickoutside';
import { useDispatch } from 'react-redux';
import { updateListTitle, addNewCard, deleteList } from './actions';
import Card from './card';


const List = (props) => {

  const [showAddCardInput, setAddCardInput] = React.useState(false);
  const addCardClickHandler = () => setAddCardInput(true);
  const cancelAddCard = () => setAddCardInput(false);

  const AddCardInput = () => {

    const ref = React.useRef(null);
    useOnClickOutside(ref, cancelAddCard);
    const [newCardTitle, setNewCardTitle] = useState('');
    const listForNewCard = props.list._id;

    const submitNewCard = (e) => {      
      e.preventDefault();
      dispatch(addNewCard(newCardTitle, listForNewCard));
      setAddCardInput(false);
    }

    
    return (
      <Form ref={ref} onSubmit={submitNewCard} id={props._id}>
        <StyledForm type="text"  placeholder="Enter a title for this card..." onChange={e => setNewCardTitle(e.target.value)}/>
        <StyledButton variant='primary' type="submit" >Add Card</StyledButton>
        <Close onClick={cancelAddCard} className="float-end" />
      </Form>
    );
  }

  const [showTitleInput, setShowTitleInput] = React.useState(false);
  const handleClickTitle = () => setShowTitleInput(true);
  const dispatch = useDispatch();

  const TitleInput = () => {

    const ref = React.useRef();
    useOnClickOutside(ref, () => setShowTitleInput(false));
    return(<TitleInputStyle ref={ref} defaultValue={props.list.title} onKeyPress={handleListTitleChange}></TitleInputStyle>)
  };

  const handleListTitleChange = (e) => {
    if (e.key === 'Enter') {
      setShowTitleInput(false);
      dispatch(updateListTitle(props.list, e.target.value));
      return;
    }
  };

  const [showDeleteList, setShowDeleteList] = useState(false);
  const toggleShowDeleteList = () => setShowDeleteList(!showDeleteList);

  const DeleteListConfirmation = () =>{
    return (
      <ToastContainer>
        <Toast show={showDeleteList} onClose={toggleShowDeleteList}>
        <Toast.Header>
              <small className="me-auto">Delete This List and All Associated Cards?</small>
        </Toast.Header>
            <div className="d-grid gap-2">
              <Button variant="danger" onClick={DeleteList}>Delete List</Button>
            </div>
        </Toast>
      </ToastContainer>

    )
  }

  const DeleteList = () => {
    const listId = props.list._id;
    const boardId = props.list.board;   
    // console.log(listId)
    // console.log(boardId) 
    dispatch(deleteList(boardId, listId));
  };

  

  return (
    <Draggable draggableId={props.list._id} index={props.index}>
      {(provided, snapshot) => (        
        <Container 
          {...provided.draggableProps} 
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Row>
          <Col xs={9}>
          <Title {...provided.dragHandleProps} onClick={handleClickTitle}>
            { showTitleInput ? <TitleInput /> : props.list.title } </Title>
          </Col>
          <Col xs={3}>
          <Close onClick={toggleShowDeleteList}  className='float-end, threedots' />
          </Col>
          </Row>
          <Row>
            {toggleShowDeleteList ? <DeleteListConfirmation /> : ''} 
          </Row>


          <Droppable 
            droppableId={props.list._id}
            type="card"
            key={props.list._id}
          >
            {(provided) => (
              <CardList 
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                {props.list.card.map((card, index) => (
                  <Card key={card._id} card={card} index={index} />
                ))}
                {provided.placeholder}                
              </CardList>
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

const Close = styled(CloseButton)`
padding: 20px;
&:focus {
  box-shadow: none;
  outline-offset: none;
}
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
  &:hover {
    cursor:pointer;
  }
  font-weight:800;  
  padding: 16px;
  color: #172b4d;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const TitleInputStyle = styled.input`
border: 1px solid lightgrey;
border-radius: 5px;
padding: 8px;
font-family: sans-serif;
color: #172b4d;
font-weight:800; 
background-color:white;
margin-left: -9px;
margin-top: -12px;
margin-bottom: -12px;
margin-right: -18px;
`
const CardList = styled.div`
  padding: 0px 8px;
  min-height: 20px;
`;

const ToastContainer = styled.div`
padding:0px 20px 10px 20px;
margin-bottom: -10px;


`