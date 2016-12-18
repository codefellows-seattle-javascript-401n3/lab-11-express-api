'use strict';

let express = require('express');
let morgan = require('morgan');
let jsonParser = require('body-parser').json();
let createError = require('http-errors');

let app = express();
let router = express.Router();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(jsonParser);

require('./routes/poke-routes')(router);
app.use(router);

app.use((err, req, res, next) => {
  console.error(err.message);

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
