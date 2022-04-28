import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin, guestUserLogin } from "../actions";
import "../../App.css";


const Auth = ({ authenticate }) => {
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const checkUser = () => {
    if (currentUser.isLoggedIn) {
      authenticate();
      navigate("/home");
    }
  }
  
  const onClick = (e, checkUser) => {
    e.preventDefault();
    dispatch(userLogin(e.target.name.value, e.target.password.value ));
    e.target.name.value = '';
    e.target.password.value = '';
    checkUser();
  };
  
  const onGuestAccessClick = (e, checkUser) => {
    e.preventDefault();
    console.log('clicked');
    dispatch(guestUserLogin());
  }

  useEffect(() => {
    const checkUser = () => {
      if (currentUser.isLoggedIn) {
        authenticate();
        navigate("/home");
      }
    }
    checkUser();
  }, [checkUser, currentUser.isLoggedIn]);

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
      type="submit">Log In
    </SubmitButton>

    </Form>

    <span>or</span><br></br>

    <Form onSubmit={onGuestAccessClick}>
      <GuestAccessButton type="submit">
        Login as a guest
      </GuestAccessButton>
    </Form>

    </AuthContainer>
  
  );
};

export default Auth;

const AuthContainer = styled.div`
  margin: 3em auto;
  padding: 2em;
  width: 100vw;
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
margin: 1em auto;
width: 282px;
padding: 8px;
font-family: sans-serif;
color: #ebecf0;
background-color:white;
`

const SubmitButton = styled(Button)`
margin: 8px;
`

const GuestAccessButton = styled(Button)`
border: 1px solid lightgrey;
border-radius: 5px;
`
