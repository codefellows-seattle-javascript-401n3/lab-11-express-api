'use strict';

const express = require('express');
const Recipe = require('./model/recipe');
const PORT = process.env.PORT || 3000;
const app =  express();
const cors = require('./lib/cors');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const handleError = require('./lib/error-middleware');
const debug = require('morgan');
const storage = require('./storage/storage.js');

app.use(debug('dev'));
app.use(cors);

// app.get('/api/recipe/?id=', (req, res) => {
//   res.json({});
//   //get some stuff
// });

app.post('/api/recipe', jsonParser, (req, res, next) => {
  debug('in route /api/recipe');
  //post some stuff to data module...check if it exists first
  try {
    const recipe = new Recipe(req.body.name, req.body.ingredients);
    storage.createItem('recipe', recipe)
    .then(recipe => res.json(recipe))
    .catch(err => {
      err = createError(500, 'new recipe not saved in storage module');
      next(err);
    });
  } catch (err) {
    next(createError(400, 'bad user request')); //passes error to createError
  }
});

// app.put('/api/recipe/?id=', bodyParser, (req, res) => {
//   //update some stuff or error out
// });

// app.delete('/api/recipe/?id=', );

app.use(handleError);

app.listen(PORT, function() {
  console.log(`listening on ${PORT}`);
});
