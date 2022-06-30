const express = require('express');
const fs = require('fs');
const path = require('path');
const rescue = require('express-rescue');

const talkerRouter = express.Router();

talkerRouter.get('/', rescue((req, res, _next) => {
  const filePath = path.resolve('./talker.json');
  const talkers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.status(200).json(talkers);
}));

module.exports = talkerRouter;