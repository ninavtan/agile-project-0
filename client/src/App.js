import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Provider, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import { Routes, Route, Navigate } from "react-router-dom";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Board from './components/board';
import Home from './components/auth/home';
import Auth from './components/auth/auth';
import NavBar from './components/navbar';

  const App = () => {
    const [auth, setAuth] = useState(null);

    const currentUser = useSelector(state => state.user);
    // if currentUser is true, set auth to true.

    console.log('Is the user logged in?' + currentUser.isLoggedIn);
    useEffect(() => {if (currentUser.isLoggedIn) {
      setAuth(true);
    } else {
      setAuth(false);
    }}, []);

    // Gets the 'user' item from localStorage to check if the session is persisting.
    // useEffect(() => {
    //   let user = localStorage.getItem("user");
    //   user && JSON.parse(user) ? setAuth(true) : setAuth(false);
    // }, []);
  
    // If auth is true, sets a session in localStorage.
    // useEffect(() => {
    //   localStorage.setItem("user", auth);
    // }, [currentUser, auth]);
  
    return (
      // <Provider store={store}>
      <>

      <Routes>
        {!auth && (
          <Route
            path="/auth"
            element={<Auth authenticate={() => setAuth(true)} />}
          />
        )}
  
        {auth && (
          <>
            <Route
              path="/home"
              element={<Home logout={() => setAuth(false)} />}
            />
            <Route path="/boards" element={<Board />} />
          </>
        )}
        <Route path="*" element={<Navigate to={auth ? "/home" : "/auth"} />} />
      </Routes>
    </>

    );
  };
  
  export default App;