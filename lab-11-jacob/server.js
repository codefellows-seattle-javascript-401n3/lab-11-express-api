const express = require('express');
const createError = require('http-errors');
let bodyParser = require('body-parser');
let app = express();
let router = express.Router();

const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());//function will be executed with every request to the app.

require('./route/user-route.js')(router); //express.Router is now injected into the function param that is returned from requiring this module
app.use(router);

app.use((err, req, res, next) => {
  console.error(err.message);

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(3000, () => {
  console.log(`server started on port ${PORT}`);
});
