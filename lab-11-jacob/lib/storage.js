const Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .catch(err => Promise.reject(err));
};

exports.updateItem = function(item) {
  if (!item) return Promise.reject(new Error('expected item'));
  let newJson = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/users/${item.id}.json`, newJson)
  .catch(err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) { //this is the version that persists
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
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
  .catch(err => {
    Promise.reject(err);

  });
};

exports.deleteUser = function(schemaName, id) { //this is the version that persists
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(err));
};
