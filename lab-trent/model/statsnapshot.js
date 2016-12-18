'use strict';

const uuid = require('uuid');
const createError = require('http-errors');

module.exports = function(username, stats) {
  if (!username || !stats) throw createError(400, 'expected username and stats');
  this.id = uuid();
  this.username = username;
  this.stats = stats;
};
