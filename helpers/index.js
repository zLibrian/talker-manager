const path = require('path');
const fs = require('fs');

const readAndConvertFileToJSON = (filePath) => {
  const resolvedFilePath = path.resolve(filePath);
  const talkers = JSON.parse(fs.readFileSync(resolvedFilePath, 'utf-8'));
  return talkers;
};

const convertAndWriteJsonToFile = (filePath, data) => {
  const resolvedFilePath = path.resolve(filePath);
  fs.writeFileSync(resolvedFilePath, JSON.stringify(data));
};

module.exports = {
  readAndConvertFileToJSON,
  convertAndWriteJsonToFile,
};