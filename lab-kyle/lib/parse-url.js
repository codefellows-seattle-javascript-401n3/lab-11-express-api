'use strict';

const parsedUrl = require('url').parse;
const parsedQuery = require('querystring').parse;

module.exports = function(req) {
  req.url = parsedUrl(req.url);
  req.url.query = parsedQuery(req.url.query);
  return Promise.resolve(req);
};
