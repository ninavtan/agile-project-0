import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, fetchUserBoards } from "../actions";
import "../../App.css";


const Home = ({ logout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user);

  const boards = useSelector(state => state.boards.allBoards);
  
  useEffect(() => {
    checkUser();
    dispatch(fetchUserBoards(currentUser._id));
  }, []);

  const checkUser = () => {
    if (!currentUser.isLoggedIn) {
      logout();
      navigate("/auth");
    }
  }

  const handleLogoutClick = () => {
    dispatch(userLogout(currentUser._id));
    logout();

  }

  return (
    <div>
      <StyledButton onClick={handleLogoutClick}>Logout</StyledButton>
      <div id="boardContainer">
        <h1> Hi {currentUser.username}, you are logged in.</h1>
        
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
      </div>
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

const StyledButton = styled(Button)`
background-color: #c4c9cc;
border: none;
color: black;
`


