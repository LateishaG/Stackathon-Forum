import express from 'express';
const app = express.Router();
import { User } from '../db/index.js';
import isLoggedIn from './middleware.js';
import socketMap from '../SocketMap.js';

export default app;

app.get('/public/:id', async (req, res, next) => {
  try {
    res.send(await User.findPublicProfile(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.get('/online_users', (req, res, next) => {
  try {
    res.send(
      Object.values(socketMap).map(value => {
        return { id: value.user.id };
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get('/friends/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getFriends());
  } catch (ex) {
    next(ex);
  }
});

app.put('/friends/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.updateFriend(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete('/friends/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.removeFriend(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.post('/friends/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.addFriend(req.body));
  } catch (ex) {
    next(ex);
  }
});
