import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchThreads, fetchTopics, loginWithToken } from '../store/index.js';
import { Link, Routes, Route } from 'react-router-dom';
import Nav from './Nav.js';
import Topic from './Topic.js';
import Home from './Home.js';
import Login from './Login.js';
import Thread from './Thread.js';
import { Typography, Container } from '@mui/material/index.js';

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
