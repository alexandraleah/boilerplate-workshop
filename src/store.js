import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

//reducer
function dummyReducer(state = {}, action) {
  return state;
}

const store = createStore(
  dummyReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
