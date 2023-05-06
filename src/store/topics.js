import axios from 'axios';

const topics = (state = [], action) => {
  if (action.type === 'SET_TOPICS') {
    return action.topics;
  }

  return state;
};

export const fetchTopics = () => {
  return async dispatch => {
    const response = await axios.get('/api/topics');
    dispatch({ type: 'SET_TOPICS', topics: response.data });
  };
};

export default topics;
