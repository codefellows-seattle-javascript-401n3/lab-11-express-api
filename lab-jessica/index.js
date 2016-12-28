'use strict';
// node modules
const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();
const createError = require('./lib/create-errors.js');

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(jsonParser);

app.use(createError);

require('./routes/book-routes')(router);
app.use(router);

app.listen(PORT, function() {
  console.log('server listening on port', PORT);
});
