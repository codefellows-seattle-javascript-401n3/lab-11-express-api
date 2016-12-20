'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;
const app =  express();
const cors = require('./lib/cors');
const createError = require('./lib/http-errors');

app.use(cors);
app.use(createError);

app.get('/', (req, res) => {
  res.json({});
});

app.listen(PORT, function() {
  console.log(`listening on ${PORT}`);
});
