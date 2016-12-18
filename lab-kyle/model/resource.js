'use strict';

const uuid = require('node-uuid');

module.exports = function(name, color) {
  this.id = uuid.v4();
  this.name = name;
  this.color = color;
};
