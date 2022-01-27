import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Board from './components/board';
import Login from './components/login';

// Redux Devtools Configuration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

// const App = (props) => {
const App = () => {

  return (
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
  </Provider>
  );
}
export default App;