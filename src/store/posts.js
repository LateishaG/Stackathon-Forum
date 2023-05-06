import axios from 'axios';

const posts = (state = [], action) => {
  if (action.type === 'SET_POSTS') {
    return action.posts;
  }

  return state;
};

export const fetchThreadPosts = id => {
  return async dispatch => {
    const response = await axios.get(`/api/threads/${id}`);
    dispatch({ type: 'SET_POSTS', posts: response.data });
  };
};

export default posts;
