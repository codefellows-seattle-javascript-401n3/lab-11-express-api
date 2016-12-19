const express = require('express');
let bodyParser = require('body-parser');
let errorHandler = require('./lib/error.js');
let app = express();
let router = express.Router();

const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());//function will be executed with every request to the app.

require('./route/user-route.js')(router); //express.Router is now injected into the function param that is returned from requiring this module
app.use(router);

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`server started on port ${PORT}`);
});
