import express from 'express';
const app = express.Router();
import { User } from '../db/index.js';
import isLoggedIn from './middleware.js';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

export default app;

app.post('/', async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post('/register', async (req, res, next) => {
  try {
    const user = await User.create({
      ...req.body,
      avatar: createAvatar(thumbs, {
        seed: `${req.body.username}`
      }).toDataUriSync()
    });
    res.send(user.generateToken());
  } catch (ex) {
    next(ex);
  }
});

app.get('/', isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

app.put('/', isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    //define the properties a user can change
    await user.update(req.body);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
