import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchThreads, fetchTopics, loginWithToken } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Topic from './Topic';
import Home from './Home';
import Login from './Login';
import Thread from './Thread';
import { Typography, Container } from '@mui/material';

const App = () => {
  const { auth, topics } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchTopics());
    dispatch(fetchThreads());
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
        <Route
          path={'/t/:topicName'}
          element={<Topic />}
        />

        {topics.map(topic => {
          return (
            <Route
              key={topic.id}
              path={`/t/${topic.name}/:threadId`}
              element={<Thread />}
            />
          );
        })}
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
