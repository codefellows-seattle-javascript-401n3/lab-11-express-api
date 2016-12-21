'use strict';

const uuid = require('node-uuid');
// let createError = require('http-errors');

module.exports = function(name, color) {
  // if (!name) throw createError(400, 'exepected name');
  // if (!color) throw createError(400, 'expected color');

  this.id = uuid.v4();
  this.name = name;
  this.color = color;
};
