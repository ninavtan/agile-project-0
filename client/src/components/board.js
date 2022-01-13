import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Row,Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import List from './list';
import { updateListOrder, moveTaskWithinList, moveTaskBetweenLists } from './actions';


const Board = () => {
  const lists = useSelector(state => state.lists);
  const listOrder = useSelector(state => state.listOrder);
  const allTasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  
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
  
    if (type === 'column') {
      const newListOrder = Array.from(listOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      dispatch(updateListOrder(newListOrder));
      return;
    };

    const startList = lists[source.droppableId];
    const finishList = lists[destination.droppableId];

    //Moving a task within the same list
    if(startList === finishList){
      const newTaskIds = Array.from(startList.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newList = {
        ...startList,
        taskIds: newTaskIds,
      }

      dispatch(moveTaskWithinList(newList));
      return;
    }

    //Moving a task to a different list
    const startListTaskIds = Array.from(startList.taskIds);
    startListTaskIds.splice(source.index, 1);
    const newStartList = {
      ...startList,
      taskIds:startListTaskIds,
    };

    const finishListTaskIds = Array.from(finishList.taskIds);
    finishListTaskIds.splice(destination.index, 0, draggableId);
    const newFinishList = {
      ...finishList,
      taskIds: finishListTaskIds,
    };

    dispatch(moveTaskBetweenLists(newStartList, newFinishList));
    return;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable 
        droppableId='all-lists' 
        direction="horizontal" 
        type="column"
      >
        {provided =>(
        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Row className="flex-row flex-nowrap">
          {Array.from(listOrder).map((listIds, index) => {
            const list = lists[listIds];
            const tasks = list.taskIds.map((taskId) => allTasks[taskId]);
            return (
                <Col >
                  <List key={list.id} column={list} tasks={tasks} index={index}/>
                </Col>
            );
          })}
          </Row>
          {provided.placeholder}
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

const Button = styled.div`
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