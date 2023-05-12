import express from 'express';
const app = express.Router();
import { User } from '../db/index.js';

export default app;

app.get('/:id', async (req, res, next) => {
  try {
    res.send(await User.findPublicProfile(req.params.id));
  } catch (ex) {
    next(ex);
  }
});
