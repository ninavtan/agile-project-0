import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { userLogin } from './actions';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from "react-router-dom";
import useAuth from './useAuth'



const Login = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  // const { login } = useAuth();

  const handleLogin = (e) => {
    // debugger;
    e.preventDefault();
    dispatch(userLogin(e.target.name.value, e.target.password.value ));
    handleRedirect();
  };

  const handleRedirect = () => {
    navigate("/home");
  }
  
  return (
    <Container>
      <Form onSubmit={handleLogin}>

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
     </Container>
  
  )

};

// Old code
    // Grab redux state
    // const user = useSelector(state => state.user);

  // If there's a user
  // const dispatch = useDispatch();
  // let navigate = useNavigate();
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   dispatch(userLogin(e.target.name.value, e.target.password.value ));
  //   console.log(user);
  //   debugger;
  //   handleRedirect();
  // };

  // const handleRedirect = () => {
  //   navigate('/');
  // }


export default Login;

const Container = styled.div`
display: flex;
justify-content: left;
margin: 30px;
background-color:#95bae7
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