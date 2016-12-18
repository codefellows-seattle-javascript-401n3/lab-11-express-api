// const storage = {};
const Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
//don't forget to install bluebird

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));
  // if(!storage[schemaName]) storage[schemaName] = {};
  // storage[schemaName][item.id] = item;
  // console.log(storage[schemaName]); //this demonstrates that the storage exists and remains as long as server is running
  // return Promise.resolve(item);
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
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

//
// exports.fetchItem = function(schemaName, id) { //this is the non-persistence version
//   return new Promise((resolve, reject) => {
//     if (!schemaName) return reject(new Error('expected schemaName'));
//     if (!id) return reject(new Error('expected id'));
//
//     var schema = storage[schemaName];
//     if(!schema) return reject(new Error('schema not found'));
//     var item = schema[id];
//     if(!item) return reject(new Error('item not found'));
//     resolve(item);
//   });
// };

// exports.deleteUser = function(schemaName, item) {  //this is the non-persistence version
//   if (!schemaName) return Promise.reject(new Error('expected schema name'));
//   if (!item) return Promise.reject(new Error('expected id'));
//
//   storage[schemaName][item] = item;
//   delete storage[schemaName][item];
//   console.log(storage[schemaName]); //confirmed that delete successfully deletes a user
// };

exports.deleteUser = function(schemaName, id) { //this is the version that persists
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(err));
};
