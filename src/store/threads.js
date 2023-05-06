import axios from 'axios';

const threads = (state = [], action) => {
  if (action.type === 'SET_THREADS') {
    return action.threads;
  }

  return state;
};

export const fetchThreads = () => {
  return async dispatch => {
    const response = await axios.get('/api/threads');
    dispatch({ type: 'SET_THREADS', threads: response.data });
  };
};

export default threads;
