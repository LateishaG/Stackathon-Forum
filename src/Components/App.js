import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';

const App = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      {/* "FS App Template" Will eventually be removed in favor of an Appbar with a logo */}
      <Typography variant='h2'>FS App Template</Typography>
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
        <div>
          <nav>
            <Link to='/'>Home</Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default App;
