'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = require('mkdirp');
const createError = require('http-errors');

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!item) return Promise.reject(createError(400, 'expected item'));
  let json = JSON.stringify(item);

  mkdirp(`${__dirname}/../data/song`, function(){
    fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then(() => item)
    .catch(err => Promise.reject(createError(500, err.message)));
  });
};

exports.updateItem = function(schemaName, id, newTitle, newArtist){
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected item'));
  if (!newTitle) return Promise.reject(createError(400, 'expected newTitle'));
  if (!newArtist) return Promise.reject(createError(400, 'expected newArtist'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      item.title = newTitle;
      item.artist = newArtist;
      let json = JSON.stringify(item);
      fs.writeFileProm(`${__dirname}/../data/${schemaName}/${id}.json`, json);
      return item;
    } catch(err) {
      return Promise.reject(err);
    }
  }).catch(err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    } catch(err){
      return Promise.reject(createError(500, err.message));
    }
  }).catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(createError(400, 'schema not found'));
  if(!id) return Promise.reject(createError(400, 'id not found'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)));
};
