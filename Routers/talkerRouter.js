const express = require('express');
const fs = require('fs');
const path = require('path');
const rescue = require('express-rescue');

const talkerRouter = express.Router();

talkerRouter.get('/:id', rescue((req, res, _next) => {
  const id = parseInt(req.params.id, 10);
  const filePath = path.resolve('./talker.json');
  const talkers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const talker = talkers.find((t) => t.id === id);
  if (!talker) throw Error('TALKER_NOT_FOUND');
  res.status(200).json(talker);
}));

talkerRouter.get('/', rescue((req, res, _next) => {
  const filePath = path.resolve('./talker.json');
  const talkers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.status(200).json(talkers);
}));

module.exports = talkerRouter;