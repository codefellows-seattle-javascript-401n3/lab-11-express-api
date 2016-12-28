'use strict';

const del = require('del');
const mkdirp = require('mkdirp');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));
  let json = JSON.stringify(item);
  mkdirp(`${__dirname}/../data/${schemaName}/`, function() {
    fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(err));
  });
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
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

exports.updateItem = function(schemaName, id, newTitle, newAuthor) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected id'));
  if (!newTitle) return Promise.reject(new Error('expected newTitle'));
  if (!newAuthor) return Promise.reject(new Error('expected newAuthor'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      item.title = newTitle;
      item.author = newAuthor;
      let json = JSON.stringify(item);
      fs.writeFileProm(`${__dirname}/../data/${schemaName}/${id}.json`, json);
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected id'));

  if(fs.existsSync(`${__dirname}/../data/${schemaName}/${id}.json`)) {
    return del([`${__dirname}/../data/${schemaName}/${id}.json`])
    .then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
      return Promise.resolve(paths);
    })
    .catch(err => {
      console.error(err);
    });
  }
  return Promise.reject(new Error('file path does not exist'));
};
