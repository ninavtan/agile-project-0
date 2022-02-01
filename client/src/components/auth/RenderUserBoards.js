import React from "react";
import styled from 'styled-components';
import { Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { fetchUserBoards } from "../actions";
import { useSelector, useDispatch } from 'react-redux';
import "../../App.css";


const RenderUserBoards = props => {

  const dispatch = useDispatch();
  const userId = props.currentUser._id;

  let userBoards = props.currentUser.board;
  let allBoards = props.boards;
  console.log(allBoards);

  const displayUserBoards = userBoards.map((board, index) => {
    return (
      <div id="userBoardContainer">
        <BoardSquare key={index}>
          <Link to="/boards">
            {board}
            </Link>
        </BoardSquare>
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