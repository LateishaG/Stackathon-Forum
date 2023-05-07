import { Topic } from '../db/index.js';
import express from 'express';
const app = express.Router();

export default app;

app.get('/', async (req, res, next) => {
  try {
    res.send(await Topic.findAll());
  } catch (ex) {
    next(ex);
  }
});
