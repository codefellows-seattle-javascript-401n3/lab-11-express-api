let storage = {};
let bluebird = require('bluebird');
let fs = bluebird.promisifyAll(require('fs'), { suffix: 'Prom'});
let del = require('del');


storage.createItem = function(item){
  let json = JSON.stringify(item);
  console.log('item', item);
  console.log('json', json);
  return fs.writeFileProm(`${__dirname}/../data/${item.id}.json`, json)
    .then(() => item)
    .catch( err => bluebird.reject(err));
};

storage.updateItem = function(id, newMake, newModel) {
  // if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return bluebird.reject(new Error('expected id'));
  if (!newMake) return bluebird.reject(new Error('expected newMake'));
  if (!newModel) return bluebird.reject(new Error('expected newModel'));

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
    .then(data => {
      try {
        let item = JSON.parse(data.toString());
        item.make = newMake;
        item.model = newModel;
        let json = JSON.stringify(item);
        fs.writeFileProm(`${__dirname}/../data/${id}.json`, json);
        return json;
      } catch (err) {
        return bluebird.reject(err);
      }
    })
    .catch(err => bluebird.reject(err));
};


storage.fetchItem = function(id){
  console.log('running fetch');
  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
    .then(data => {
      console.log('got into the .then');
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch(err){
        return bluebird.reject(err);
      }
    })
    .catch(err => bluebird.reject(err));
};

//NOTE: I've removed the 'fetchAll' function becuase it wasn't in the requirements and having it in there failed my 400 test for no ID provided since when you run fetchAll you're not providing an ID.
// storage.fetchAll = function() {
//   return fs.readdirProm(`${__dirname}/../data/`)
//   .then(data => {
//     return data.map(str =>
//       str.replace('.json', ''));
//   });
// };

storage.deleteItem = function(id){
  if (!id) return bluebird.reject(new Error('expected id'));

  console.log('got the file');
    return del([`${__dirname}/../data/${id}.json`])
    .then( paths => {
      console.log('Deleted file: ', `${id}.json`);
      return bluebird.resolve(paths);
    })
  .catch(err => {
    console.error(err);
  });
  return bluebird.reject(new Error('file path does not exist'));
};

module.exports = storage;
