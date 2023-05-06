const { Thread } = require('../db');
const app = require('express').Router();

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
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
