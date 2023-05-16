import axios from 'axios';

const friends = (state = [], action) => {
  if (action.type === 'SET_FRIENDS') {
    return action.friends;
  }
  return state;
};

export const fetchFriends = () => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      const response = await axios.get('/api/users/friends', {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: 'SET_FRIENDS',
        friends: [...response.data.friender, ...response.data.friending]
      });
    }
  };
};

export const updateFriend = updatedFriend => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      const response = await axios.put('/api/users/friends/', updatedFriend, {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: 'SET_FRIENDS',
        friends: [...response.data.friender, ...response.data.friending]
      });
    }
  };
};

export const removeFriend = id => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      const response = await axios.delete(`/api/users/friends/${id}`, {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: 'SET_FRIENDS',
        friends: [...response.data.friender, ...response.data.friending]
      });
    }
  };
};

export const addFriend = id => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem('token');
    if (getState().auth.id) {
      const response = await axios.post(
        '/api/users/friends/',
        { id },
        {
          headers: {
            authorization: token
          }
        }
      );

      dispatch({
        type: 'SET_FRIENDS',
        friends: [...response.data.friender, ...response.data.friending]
      });
    }
  };
};

export default friends;
