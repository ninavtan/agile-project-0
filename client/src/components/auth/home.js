import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from "../actions";

// userLogout functionality is not working atm. When you refresh the page, it will trigger you to log in again.


const Home = ({ logout }) => {
  const currentUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  useEffect(() => {
    checkUser();
  }, [currentUser.isLoggedIn]);

  const checkUser = () => {
    if (!currentUser.isLoggedIn) {
      logout();
      navigate("home");
    } 
  }

  // NICE-TO-DO: Display current user's boards if they have any. Was going to map over the array and print out the board IDs.
  return (
    <HomeContainer>
      <Row>
        <h1>Boards:</h1>
        {currentUser.board.length == 0 &&
          <h2>User has no boards to display.</h2>
        }
        {currentUser.board.length > 0 &&
          <h2>User has these boards:</h2>
        }
        );
        <Link to="/boards">Main Board</Link>
        
      </Row>

      <h1> Hi {currentUser.username}, you are logged in.</h1>
      {/* <StyledButton onClick={handleLogoutClick}>Logout</StyledButton> */}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
 margin: 0 auto;
  width: 80vw;
  display: block;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: #ebecf0;
  font-family: sans-serif;
  text-align: center;
`;

const StyledButton = styled(Button)`
margin: 8px;
`
