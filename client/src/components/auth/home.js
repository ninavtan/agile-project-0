import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, fetchUserBoards } from "../actions";
import RenderUserBoards from "./RenderUserBoards";
import "../../App.css";

// userLogout functionality is not working atm. When you refresh the page, it will trigger you to log in again.

const Home = ({ logout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user);

  const boards = useSelector(state => state.boards.allBoards);

  // console.log(boards);
  let arrayifiedBoards = Object.entries(boards);
  console.log(arrayifiedBoards);
  
  useEffect(() => {
    checkUser();
    // This grabs all the user's boards after they log in.
    dispatch(fetchUserBoards(currentUser._id));
  }, [currentUser.isLoggedIn]);

  const checkUser = () => {
    if (!currentUser.isLoggedIn) {
      logout();
      navigate("home");
    }
  }

  return (
    <div id="boardContainer">
      <h1> Hi {currentUser.username}, you are logged in.</h1>
      {/* <StyledButton onClick={handleLogoutClick}>Logout</StyledButton> */}

        
      {boards.map(board => (
        <div id="userBoardContainer">
          <Link
            class="boardLinks"
            style={{ margin: "1rem" }}  
            to={`/boards/${board._id}`}>

            <BoardSquare>
              {board.title}
            </BoardSquare>
          </Link>
        </div>
      ))}
    
    <Outlet/>
    </div>
    
  );
};

export default Home;

const BoardSquare = styled.div`
 width: 200px;
 height: 100px;
 margin: 1em;
 display: inline-block;
border-radius: 3px;
padding: 1em;

`;


