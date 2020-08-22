import React from 'react';
import { Provider } from 'react-redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(reduxPackMiddleware));

export default function() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
