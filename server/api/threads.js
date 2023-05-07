import { Thread } from '../db/index.js';
import express from 'express';
const app = express.Router();

export default app;

app.get('/', async (req, res, next) => {
  try {
    console.log('hello');
    res.send(await Thread.findAll());
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
