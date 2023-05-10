import { Thread, User } from '../db/index.js';
import isLoggedIn from './middleware.js';
import express from 'express';
const app = express.Router();

export default app;

app.get('/', async (req, res, next) => {
  try {
    res.send(
      await Thread.findAll({
        include: {
          model: User,
          attributes: ['username', 'avatar']
        }
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const thread = await Thread.findByPk(req.params.id);
    res.send(await thread.getPosts());
  } catch (ex) {
    next(ex);
  }
});

app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const thread = await req.user.createThread(req.body);

    res.send(thread);
  } catch (ex) {
    next(ex);
  }
});
