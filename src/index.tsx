import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import App from './App';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxPackMiddleware)),
);

export default function Index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
