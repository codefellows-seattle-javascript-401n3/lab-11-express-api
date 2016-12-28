'use strict';

const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();

const createError = require('http-errors');

const RecipeApp = express();
const router = express.Router();

RecipeApp.use(morgan('dev'));
RecipeApp.use(jsonParser);

RecipeApp.use((err, req, res, next) => {
  console.error(err.message);

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
});

require('./route/recipes-routes')(router);
RecipeApp.use(router);
const PORT = process.env.PORT || 3000;

RecipeApp.listen(PORT, function() {
  console.log('server up', PORT);
});