const express = require('express');
const rescue = require('express-rescue');
const tokenValidator = require('../middlewares/tokenValidator');
const { readAndConvertFileToJSON, convertAndWriteJsonToFile } = require('../helpers');
const schemaValidator = require('../middlewares/schemaValidator');
const talkerSchema = require('../schemas/talkerSchema');

const talkerRouter = express.Router();

talkerRouter.get('/:id', rescue((req, res, _next) => {
  const id = parseInt(req.params.id, 10);
  const talkers = readAndConvertFileToJSON('./talker.json');
  const talker = talkers.find((t) => t.id === id);
  if (!talker) throw Error('TALKER_NOT_FOUND');
  return res.status(200).json(talker);
}));

talkerRouter.get('/', rescue((req, res, _next) => {
  const talkers = readAndConvertFileToJSON('./talker.json');
  return res.status(200).json(talkers);
}));

talkerRouter.post('/', rescue(tokenValidator), rescue(schemaValidator(talkerSchema)),
  rescue((req, res, _next) => {
    const { name, age, talk } = req.body;
    const talkers = readAndConvertFileToJSON('./talker.json');
    const prevId = talkers[talkers.length - 1].id;
    const talker = { id: prevId + 1, name, age, talk };
    talkers.push(talker);
    convertAndWriteJsonToFile('./talker.json', talkers);
    return res.status(201).json(talker);
  }));

module.exports = talkerRouter;