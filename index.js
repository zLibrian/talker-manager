const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./Routers/talkerRouter');
const error = require('./middlewares/error');
const login = require('./middlewares/login');
const validationError = require('./middlewares/validationError');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', login);
app.use('/talker', talkerRouter);

app.use(validationError, error);

app.listen(PORT, () => {
  console.log('Online');
});
