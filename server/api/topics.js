const { Topic } = require('../db');
const app = require('express').Router();

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    res.send(await Topic.findAll());
  } catch (ex) {
    next(ex);
  }
});
