'use strict';

const uuid = require('uuid');

module.exports = function(username, stats) {
  this.id = uuid();
  this.date = new Date().now();
  this.username = username;
  this.stats = stats;
};
