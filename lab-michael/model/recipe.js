let uuid = require('node-uuid');
let createError = require('http-errors');

// let storage = require('../lib/storage');  // Activate later

let Recipe = module.exports = function(name, content, mealType) {
  if (!name) return new Error('need a recipe name');
  if (!content) return new Error('need content info');
  if (!mealType) return new Error('need type of meal');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
  this.mealType = mealType;

};

Recipe.create = (_recipe) => {
  try {
    let recipe = new Recipe(_recipe);
    return storage.createItem(recipe);
  }
  catch(err) {
    return Promise.reject;
  }
};

Recipe.fetch = (id) => {
  return storage.fetchItem('recipe', id);
};
