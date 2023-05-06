import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import topics from './topics';
import threads from './threads';
import posts from './posts';

const reducer = combineReducers({
  auth,
  topics,
  threads,
  posts
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './topics';
export * from './threads';
export * from './posts';
