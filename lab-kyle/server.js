'use strict';

let express = require('express');
let morgan = require('morgan');
let jsonParser = require('body-parser').json();
let errors = require('./lib/errors');
let cors = require('./lib/cors');

let app = express();
let router = express.Router();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(jsonParser);
app.use(errors);
app.use(cors);

require('./routes/poke-routes')(router);
app.use(router);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
