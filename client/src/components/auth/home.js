import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';



const Home = ( props ) => {
  const currentUser = useSelector(state => state.user);
  console.log(currentUser);

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
      <StyledButton onClick={props.logout}>Logout</StyledButton>
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
