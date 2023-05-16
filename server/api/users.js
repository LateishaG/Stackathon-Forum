import express from 'express';
const app = express.Router();
import { User } from '../db/index.js';
import isLoggedIn from './middleware.js';

export default app;

app.get('/public/:id', async (req, res, next) => {
  try {
    res.send(await User.findPublicProfile(req.params.id));
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
