'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;
const app =  express();
const cors = require('./lib/cors');

app.use(cors);

app.get('/', (req, res) => {
  res.json({});
});

app.listen(PORT, function() {
  console.log(`listening on ${PORT}`);
});
