'use strict';
let uuid = require('node-uuid');

let Recipe = module.exports = function(name, content, mealType) {
  if (!name) return new Error('need a recipe name');
  if (!content) return new Error('need content info');
  if (!mealType) return new Error('need type of meal');

  this.id = uuid.v4();
  this.name = name;
  this.content = content;
  this.mealType = mealType;

};
module.exports = Recipe;

