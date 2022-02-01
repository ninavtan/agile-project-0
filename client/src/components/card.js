import React from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteCard } from './actions';
import Comment from './comment';

const CardDetailView  = (props) => {
  const dispatch = useDispatch();

  const DeleteCard = () => {
    const cardId = props.id;
    dispatch(deleteCard(cardId));    
  };
  
  
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Description</h6>
        <p>
        { props.description ? props.description : "Add a more detailed description..." }
        </p>
        <h6>Comments</h6>
        <Comment comments={props.comments}/>
        <Button variant="danger" onClick={DeleteCard} className="float-end">Delete Card</Button>
      </Modal.Body>

    </Modal>
  );
}

const Card = (props) => {
  const [detailViewShow, setDetailViewShow] = React.useState(false);
  return (
    <>
    <Draggable draggableId={props.card._id} index={props.index}>
      {(provided, snapshot) => (
      <ClickForDetail onClick = {() => setDetailViewShow(true)}>
        <CardStyle
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.card.cardTitle}
          
        </CardStyle>
      </ClickForDetail>
      )}
    </Draggable>
    <CardDetailView
        show={detailViewShow}
        onHide={() => setDetailViewShow(false)}
        title={props.card.cardTitle}
        description={props.card.description}
        label={props.card.cardLabel}
        id = {props.card._id}
        firstComment={props.card.comment[0]}
        comments={props.card.comment}
        />
  </>
  );
}

export default Card;

const ClickForDetail = styled.div`

`;

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
`;


const CardStyle = styled.div`
margin: auto;
border: 1px solid lightgrey;
border-radius: 5px;
min-height: 80px;
padding: 8px;
margin-bottom: 8px;
font-family: sans-serif;
color: #172b4d;
background-color:white;
&:hover {
  transition: background-color 0.2s ease;
  background-color: #f6f6f6;
  cursor:pointer;
}
transition: filter 0.2s ease;
filter: ${props => (props.isDragging ? 'drop-shadow(2px 2px 8px darkgrey)' : 'none')};
background-color: ${props => (props.isDragging ? '#f6f6f6' : 'none')};

-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`;