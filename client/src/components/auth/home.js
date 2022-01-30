import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from "../actions";




const Home = ({ logout }) => {
  const currentUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  console.log(currentUser);

  const handleLogoutClick = () => {
    // logout();
    // navigate("auth");
    dispatch(userLogout);

    checkUser();
  }
  // dispatch logout action
  // useEffect(() => {
  //   checkUser();
  // }, [currentUser.isLoggedIn]);

  const checkUser = () => {
    if (currentUser.isLoggedIn) {
      logout();
      navigate("home");
    } 
  }

  // map over all boards
  return (
    <HomeContainer>
      <Row>
        <h1>Boards:</h1>
        {/* {currentUser.board.map(b => {
          return (
          <h2>{b}</h2>
        )}
        )}; */}
        <Link to="/boards">Main Board</Link>
        
      </Row>

      <h1> Hi {currentUser.username}, you are logged in.</h1>
      <StyledButton onClick={handleLogoutClick}>Logout</StyledButton>
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
