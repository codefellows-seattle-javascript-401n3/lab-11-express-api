'use strict'

let express = require('express');
let morgan = require('morgan');
let jsonParser = require('body-parser').json()

let createError = require('http-errors');

const PORT = process.env.PORT || 3000;

let appRecipe = express();

appRecipe.use(morgan('dev'));
app.use(jsonParser);


appRecipe.use((err, req, res, next) => {
  console.error(err.message);
  err = createError(500, err.messsage);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log('server started');
})