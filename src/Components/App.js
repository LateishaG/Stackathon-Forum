import React, { useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchFriends,
  fetchThreads,
  fetchTopics,
  loginWithToken
} from '../store/index.js';
import { Link, Routes, Route } from 'react-router-dom';
import Nav from './Nav.js';
import Topic from './Topic.js';
import Home from './Home.js';
import Login from './Login.js';
import Thread from './Thread.js';
import Profile from './Profile.js';
import Friend from './Friends.js';
import { Typography, Container } from '@mui/material';

const App = () => {
  const { auth, topics } = useSelector(state => state);
  const dispatch = useDispatch();
  const prevAuth = useRef({});

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchTopics());
    dispatch(fetchThreads());
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && auth.id) {
      console.log('logged in');
      dispatch(fetchFriends());
    } else if (prevAuth.current.id && !auth.id) {
      console.log('logged out');
    }
  }, [auth]);

  useEffect(() => {
    prevAuth.current = auth;
  });

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
        {!!auth.id && (
          <Route
            path='/friends'
            element={<Friend />}
          />
        )}
      </Routes>
    </Container>
  );
};

export default App;
