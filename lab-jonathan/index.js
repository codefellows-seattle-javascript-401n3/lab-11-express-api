let express = require('express');
let morgan = require('morgan');
let jsonParser = require('body-parser').json();
let PORT = process.env.PORT || 9000;

let createError = require('http-errors');

let app = express();
let router = express.Router();

app.use(morgan('dev'));
app.use(jsonParser);

require('./route/guitars-routes')(router);
app.use(router);

app.use((err, req, res, next) => {
  console.error(err.message);

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log('server started');
});
