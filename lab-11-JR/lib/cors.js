'use strict';

module.exports = (req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*'); //allow request from any origin to come into here
  //this is writing special headers
  res.append('Access-Control-Allow-Headers', '*');
  res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
};
