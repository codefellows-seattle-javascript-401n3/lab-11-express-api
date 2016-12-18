'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createError = require('http-errors');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', function(req, res, next) {
  console.log('Connection from: ' + req.connection.remoteAddress.replace('::ffff:', '') + ' requesting ' + req.url);
  next();
});

app.use('/statshots', require('./routes/statshotroute'));

app.use(function(req, res, err) {
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, function() {
  console.log('Server listening on http://localhost/:' + PORT);
});
