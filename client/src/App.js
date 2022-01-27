import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Provider, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Board from './components/board';
import Login from './components/login';
import Homepage from './components/homepage';
// import useAuth from './components/useAuth.js';

// Redux Devtools Configuration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

// const App = (props) => {
const App = () => {

  // console.log(isLoggedIn);
  
  function RequireAuth({ children }) {
    debugger;
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    if (isLoggedIn) {
      return children;
     } else {
      return <Navigate to="/login" />
    };  
  }


  return (
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/boards"
            element={
              <RequireAuth>
                <Board />
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Homepage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  </Provider>
  );
}
export default App;