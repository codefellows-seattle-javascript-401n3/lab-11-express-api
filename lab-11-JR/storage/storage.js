'use strict';
//pretend this is a DB that's wrapped in a promise function

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const del = require('del');
//create storage object to attach .createAll/.fetchAll

exports.createItem = function(recipeSchema, recipe) {
  //this looks like recipeConstructor/recipeInstanceWithUniqueID
  if(!recipeSchema) return Promise.reject(createError(400, 'expected Schema'));
  if(!recipe) return Promise.reject(createError(400, 'expected unique recipe'));
  const json = JSON.stringify(recipe);
  return fs.writeFileProm(`${__dirname}/../data/${recipeSchema}/${recipe.id}.json`, json)
  .then(() => recipe);
};

exports.fetchItem = function(recipeSchema, id) {
  if(!recipeSchema) return Promise.reject(createError(400, 'expected Schema'));
  if(!id) return Promise.reject(createError(400, 'expected unique recipe id'));
  return fs.readFileProm(`${__dirname}/../data/${recipeSchema}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(recipeSchema, id) {
  if(!recipeSchema) return Promise.reject(createError(400, 'expected Schema'));
  if(!id) return Promise.reject(createError(400, 'expected unique recipe id'));
  return Promise.resolve(del([`${__dirname}/../data/${recipeSchema}/${id}.json`]))
  //i could probably just put the suffix on here and not do Promise.resolve...but i am lazy and dont want to change it.
  .then(paths => {
    console.log(`deleted ${id}.json`);
    return Promise.resolve(paths);
  })
  .catch(err => Promise.reject(createError(404, err.message))
  );
};
