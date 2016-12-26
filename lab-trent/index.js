'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const errorRoute = require('./routes/error-route');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', function(req, res, next) {
  console.log('Connection from: ' + req.connection.remoteAddress.replace('::ffff:', '') + ' requesting ' + req.url);
  next();
});

app.use('/api', require('./routes/statshotroute'));
app.use(errorRoute);

app.listen(PORT, function() {
  console.log('Server listening on http://localhost/:' + PORT);
});
