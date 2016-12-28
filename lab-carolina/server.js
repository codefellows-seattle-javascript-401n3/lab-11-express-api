'use strict';

const morgan = require('morgan');
const express = require('express');
const jsonParser = require('body-parser').json();

const router = express.Router();
const app = express();

const PORT = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(jsonParser);

require('./route/song-route.js')(router);
app.use(router);

app.listen(PORT, function(){
  console.log('server started on port ', PORT);
});
