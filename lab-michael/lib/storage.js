
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

const storage = {};

exports.fetchAll = function(recipe) {
  return fs.readdirProm(`${__dirname}/../data/${recipe}/`)
  .then(data => {
    return data.map(str =>
      str.replace('.json', ''));
  });
};

exports.createItem = function(recipe, item) {
  if(!recipe) return Promise.reject(createError('expected reciple'));
  if(!item) return Promise.reject(createError('exptected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${recipe}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));

};
exports.fetchItem = function(recipe, id) {

  return fs.readFileProm(`${__dirname}/../data/${recipe}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};
exports.updateItem = function(recipe, id, newName, newContent, newMealType) {
  if (!recipe) return Promise.reject(new Error('expected recipe'));
  if (!id) return Promise.reject(new Error('expected id'));
  if (!newName) return Promise.reject(new Error('expected new Name'));
  if (!newContent) return Promise.reject(new Error('expected new Content'));
  if (!newMealType) return Promise.reject(new Error('expected new MealType'));


  return fs.readFileProm(`${__dirname}/../data/${recipe}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      item.name = newName;
      item.content = newContent;
      item.mealType = newMealType;
      console.log(newName, newContent, newMealType);
      let json = JSON.stringify(item);
      fs.writeFileProm(`${__dirname}/../data/${recipe}/${id}.json`, json);
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};

exports.deleteItem = function(recipe, id) {
  return new Promise((resolve,reject) => {
    if (!recipe) return reject (createError('expected recipe'));
    if (!id) return reject (createError('expected id'));

    recipe = storage[recipe];
    if(!recipe) return reject(createError('recipe not found'));
    delete recipe[id];

    resolve();
  });
};
