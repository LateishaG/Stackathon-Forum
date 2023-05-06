import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

//This will become a home page that shows Topics
const Home = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
