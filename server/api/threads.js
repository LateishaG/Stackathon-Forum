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
          attributes: ['id', 'username', 'avatar']
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

    res.status(201).send(thread);
  } catch (ex) {
    next(ex);
  }
});

app.put('/', isLoggedIn, async (req, res, next) => {
  try {
    const thread = await req.user.updateThread(req.body);

    res.send(thread);
  } catch (ex) {
    next(ex);
  }
});

app.post('/posts', isLoggedIn, async (req, res, next) => {
  try {
    const post = await req.user.createPost(req.body);

    res.status(201).send(post);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/posts/:id', isLoggedIn, async (req, res, next) => {
  try {
    await req.user.deletePost(req.params.id);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put('/posts/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await req.user.updatePost(req.body);
    res.send(post);
  } catch (ex) {
    next(ex);
  }
});
