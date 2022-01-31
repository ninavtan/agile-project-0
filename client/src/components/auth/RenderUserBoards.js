import React from "react";
import styled from 'styled-components';
import { Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { fetchUserBoards } from "../actions";
import { useDispatch } from 'react-redux';
import "../../App.css";


const RenderUserBoards = props => {

  const dispatch = useDispatch();
  const userId = props.currentUser._id;
  console.log(userId);
  // dispatch fetch user boards
  dispatch(fetchUserBoards(userId));

  let userBoards = props.currentUser.board;

  const displayUserBoards = userBoards.map((board, index) => {
    return (
      <div id="userBoardContainer">
        <BoardSquare key={index}>{board}</BoardSquare>
      </div>
    )
  });
  

 return (
   <div>{displayUserBoards}</div>
 )
};

export default RenderUserBoards;


const BoardSquare = styled.div`
 width: 100px;
 height: 50px;
 margin: 2em;
 display: inline-block;
`;

// Link to={`/boards/${board._id}`}
// key={board._id}