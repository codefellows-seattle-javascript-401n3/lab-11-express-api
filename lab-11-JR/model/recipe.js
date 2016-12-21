'use strict';

const uuid = require('node-uuid');

module.exports = function(name, ingredients) {
  this.name = name,
  this.ingredients = ingredients,
  this.id = uuid.v4();
};
