import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NavBar from './components/navbar';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
            <NavBar/>  

    <Provider store={store}>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);