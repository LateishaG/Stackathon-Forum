import axios from 'axios';

const posts = (state = [], action) => {
  if (action.type === 'SET_POSTS') {
    return action.posts;
  }
  if (action.type === 'ADD_POST') {
    return [...state, action.post];
  }

  return state;
};

export const fetchThreadPosts = id => {
  return async dispatch => {
    const response = await axios.get(`/api/threads/${id}`);
    dispatch({ type: 'SET_POSTS', posts: response.data });
  };
};

export const createPost = info => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      const response = await axios.post('/api/threads/posts', info, {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'ADD_POST', post: response.data });
    }
  };
};

export default posts;
