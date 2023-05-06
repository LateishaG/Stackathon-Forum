import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

const App = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <Container>
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
    </Container>
  );
};

export default App;
