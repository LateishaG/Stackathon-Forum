import axios from 'axios';

const posts = (state = [], action) => {
  if (action.type === 'SET_POSTS') {
    return action.posts;
  }
  if (action.type === 'ADD_POST') {
    return [...state, action.post];
  }
  if (action.type === 'DELETE_POST') {
    return state.filter(post => post.id !== action.postId);
  }
  if (action.type === 'UPDATE_POST') {
    return state.map(post => {
      if (post.id === action.post.id) {
        return action.post;
      }
      return post;
    });
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

export const deletePost = id => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      await axios.delete(`/api/threads/posts/${id}`, {
        headers: {
          authorization: token
        }
      });

      dispatch({ type: 'DELETE_POST', postId: id });
    }
  };
};

export const updatePost = info => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      const response = await axios.put('/api/threads/posts', info, {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'UPDATE_POST', post: response.data });
    }
  };
};

export default posts;
