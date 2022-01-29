import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Provider, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import { Routes, Route, Navigate } from "react-router-dom";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Board from './components/board';
import Home from './components/auth/profile';
import Auth from './components/auth/auth';

// import Login from './components/login';
// import Homepage from './components/homepage';
// import Dashboard from './components/auth/dashboard';

// Redux Devtools Configuration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

  const App = () => {
    const [auth, setAuth] = useState(null);
  
    useEffect(() => {
      let user = localStorage.getItem("user");
      user && JSON.parse(user) ? setAuth(true) : setAuth(false);
    }, []);
  
    useEffect(() => {
      localStorage.setItem("user", auth);
    }, [auth]);
  
    return (
      <Provider store={store}>
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
      </Provider>

    );
  };
  
  export default App;