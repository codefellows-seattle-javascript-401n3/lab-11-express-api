'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const storage = {};

exports.fetchAll = function(note) {
  if (!note) return Promise.reject(new Error('expected note'));
  return fs.readdirProm(`${__dirname}/../data/note`)
  .then(data => data.map( str => str.replace('.json', '')))
  .catch(err => Promise.reject(err));
};

exports.createItem = function(note, content) {
  if (!note) return Promise.reject(new Error('expected note'));
  if (!content) return Promise.reject(new Error('expected content'));

  let json = JSON.stringify(content);
  return fs.writeFileProm(`${__dirname}/../data/note/${content.id}.json`, json)
  .then(() =>  { console.log('created a new item');content;})
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(note, id) {
  if(!note) return Promise.reject(new Error('expected note'));
  if(!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/note/${id}.json`)
  .then(data => {
    try{
      let content = JSON.parse(data.toString());
      return content;
    } catch (err){
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};

exports.deleteItem = function(note, id) {
  return new Promise((resolve, reject) => {

    if(!note) return reject(new Error('expected note'));
    if(!id) return reject(new Error('expected id'));

    return fs.unlinkProm(`${__dirname}/../data/note/${id}.json`)
    .then( () => {id;console.log('successfully deleted: ' + id);})
    .catch( (err) => reject(err));
  });
};
