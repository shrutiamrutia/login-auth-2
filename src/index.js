import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import authReducer from './store/reducer'

const composeEnhancers = compose;

const rootReducer = combineReducers({
  login: authReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))
const app = (
  <Provider store={store}>
    <App />
  </Provider>

)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);