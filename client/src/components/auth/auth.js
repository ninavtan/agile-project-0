import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from "../actions";

const Auth = ({ authenticate }) => {
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  

  //auth button handler
  const onClick = (e) => {
    // dispatch(userLogin('Jango', 'Fett'));
    e.preventDefault();
    dispatch(userLogin(e.target.name.value, e.target.password.value ));
    e.target.name.value = '';
    e.target.password.value = '';

    // This boolean function (defined in app.js) logs in the user even if username and password are not correct.
    // authenticate();
    // navigate("home");
  
  };

  useEffect(() => {
    checkUser();
  }, [currentUser.isLoggedIn]);

  const checkUser = () => {
    if (currentUser.isLoggedIn) {
      authenticate();
      navigate("home");
    } 
  }

  // useEffect(() => {
  //  if (currentUser) {
  //    authenticate();
  //    navigate("home");
  //  };
  // }, [currentUser]);

  return (
    <AuthContainer>
      <h2> Please log in to continue </h2>
      <Form onSubmit={onClick}>

    <StyledForm 
      required
      type="name"
      name="name"
      placeholder="username" 
    />

    <StyledForm 
      required
      type="password"
      name="password"
      placeholder="password" 
    />

    <SubmitButton 
      type="submit">Log In</SubmitButton>

      </Form>
      {/* <StyledButton onClick={onClick}>Authenticate</StyledButton> */}
    </AuthContainer>
      
  
  );
};

export default Auth;

const AuthContainer = styled.div`
  
  width: 100%;
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

const StyledForm = styled(Form.Control)`
border: 1px solid lightgrey;
border-radius: 5px;
min-height: 40px;
margin:  10px;
margin-bottom: 10px;
width: 282px;
padding: 8px;
font-family: sans-serif;
color: #ebecf0;
background-color:white;
`

const SubmitButton = styled(Button)`
margin: 8px;
`