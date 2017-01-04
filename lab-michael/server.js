'use strict';

const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();
const createError = require('./lib/middle-ware/createError.js');

const RecipeApp = express();
const router = express.Router();

RecipeApp.use(morgan('dev'));

RecipeApp.use(jsonParser);
RecipeApp.use(createError);


require('./route/recipes-routes')(router);
RecipeApp.use(router);
const PORT = process.env.PORT || 3000;

RecipeApp.listen(PORT, function() {
  console.log('server up', PORT);
});