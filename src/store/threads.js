import axios from 'axios';

const threads = (state = [], action) => {
  if (action.type === 'SET_THREADS') {
    return action.threads;
  }
  if (action.type === 'ADD_THREAD') {
    return [...state, action.thread];
  }

  return state;
};

export const fetchThreads = () => {
  return async dispatch => {
    const response = await axios.get('/api/threads');
    dispatch({ type: 'SET_THREADS', threads: response.data });
  };
};

export const createThread = info => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      const response = await axios.post('/api/threads', info, {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'ADD_THREAD', thread: response.data });
    }
  };
};

export default threads;
