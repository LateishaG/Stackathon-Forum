import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import { Typography, Container } from '@mui/material';

const App = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <Container disableGutters>
      {/* "FS App Template" Will eventually be removed in favor of an Appbar with a logo */}
      <Nav />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        {!auth.id && (
          <Route
            path='/login'
            element={<Login />}
          />
        )}
      </Routes>
    </Container>
  );
};

export default App;
