'use strict';

const uuid = require('node-uuid');

module.exports = function(name, ingredients) {
  this.name = name,
  this.ingredient = ingredients,
  this.id = uuid.v4();
};
