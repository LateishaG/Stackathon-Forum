import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchThreads, fetchTopics, loginWithToken } from '../store/index.js';
import { Link, Routes, Route } from 'react-router-dom';
import Nav from './Nav.js';
import Topic from './Topic.js';
import Home from './Home.js';
import Login from './Login.js';
import Thread from './Thread.js';
import Profile from './Profile.js';
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
    <Container
      disableGutters
      maxWidth='xl'
      sx={{ m: 0 }}
    >
      {/* Currently focusing on Functionality for the App before finishing the Theming */}
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
        <Route
          path='/profile/:id'
          element={<Profile />}
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
