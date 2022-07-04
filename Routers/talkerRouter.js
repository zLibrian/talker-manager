const express = require('express');
const rescue = require('express-rescue');
const tokenValidator = require('../middlewares/tokenValidator');
const { readAndConvertFileToJSON, convertAndWriteJsonToFile } = require('../helpers');
const schemaValidator = require('../middlewares/schemaValidator');
const talkerSchema = require('../schemas/talkerSchema');

const talkerRouter = express.Router();

const dataFilePath = './talker.json';

 talkerRouter.get('/search', rescue(tokenValidator),
  rescue((req, res, _next) => {
    const { q } = req.query;
    const talkers = readAndConvertFileToJSON(dataFilePath);
    const filteredTalkers = talkers.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
    convertAndWriteJsonToFile(dataFilePath, filteredTalkers);
    return res.status(200).json(filteredTalkers);
  }));

talkerRouter.get('/:id', rescue((req, res, _next) => {
  const id = parseInt(req.params.id, 10);
  const talkers = readAndConvertFileToJSON(dataFilePath);
  const talker = talkers.find((t) => t.id === id);
  if (!talker) throw Error('TALKER_NOT_FOUND');
  return res.status(200).json(talker);
}));

talkerRouter.get('/', rescue((req, res, _next) => {
  const talkers = readAndConvertFileToJSON(dataFilePath);
  return res.status(200).json(talkers);
}));

talkerRouter.post('/', rescue(tokenValidator), rescue(schemaValidator(talkerSchema)),
  rescue((req, res, _next) => {
    const { name, age, talk } = req.body;
    const talkers = readAndConvertFileToJSON(dataFilePath);
    const prevId = talkers[talkers.length - 1].id;
    const talker = { id: prevId + 1, name, age, talk };
    talkers.push(talker);
    convertAndWriteJsonToFile(dataFilePath, talkers);
    return res.status(201).json(talker);
  }));

  talkerRouter.put('/:id', rescue(tokenValidator), rescue(schemaValidator(talkerSchema)),
  rescue((req, res, _next) => {
    const { name, age, talk } = req.body;
    const id = parseInt(req.params.id, 10);
    const talkers = readAndConvertFileToJSON(dataFilePath);
    const talkerIndex = talkers.findIndex((t) => t.id === id);
    const talker = { id, name, age, talk };
    talkers[talkerIndex] = talker;
    convertAndWriteJsonToFile(dataFilePath, talkers);
    return res.status(200).json(talker);
  }));

  talkerRouter.delete('/:id', rescue(tokenValidator),
  rescue((req, res, _next) => {
    const id = parseInt(req.params.id, 10);
    const talkers = readAndConvertFileToJSON(dataFilePath);
    const filteredTalkers = talkers.filter((t) => t.id !== id);
    convertAndWriteJsonToFile(dataFilePath, filteredTalkers);
    return res.status(204).end();
  }));

module.exports = talkerRouter;