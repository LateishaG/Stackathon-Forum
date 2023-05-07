import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth.js';
import topics from './topics.js';
import threads from './threads.js';
import posts from './posts.js';

const reducer = combineReducers({
  auth,
  topics,
  threads,
  posts
});
console.log(typeof logger);

const store = createStore(reducer, applyMiddleware(thunk, logger.default));

export default store;

export * from './auth.js';
export * from './topics.js';
export * from './threads.js';
export * from './posts.js';
