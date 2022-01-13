import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Board from './components/board';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

// const App = (props) => {
const App = () => {

  return (
  <Provider store={store}>
      <BrowserRouter>
        <Board />
      </BrowserRouter>
  </Provider>
  );
}
export default App;