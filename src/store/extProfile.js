import axios from 'axios';

const extProfile = (state = {}, action) => {
  if (action.type === 'SET_EXT_PROFILE') {
    return action.profile;
  }
  return state;
};

export const fetchPublicProfile = id => {
  return async dispatch => {
    const response = await axios.get(`/api/users/${id}`);
    dispatch({ type: 'SET_EXT_PROFILE', profile: response.data });
  };
};

export default extProfile;
