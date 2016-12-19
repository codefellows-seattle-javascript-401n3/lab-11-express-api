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

// storage.fetchAll = function() {
//   return fs.readdirProm(`${__dirname}/../data`)
//   .then(data => {
//     console.log('data', data);
//     console.log('data is: ', typeof(data));
//       data.forEach(file => {
//         console.log('file' , file);
//         // return data.map(str => {
//   //       // str.replace('.json', '');
//       //   try {
//       //     let item = JSON.parse(data.toString());
//       //     console.log(item);
//       //     return item;
//       //   }
//       //   catch(err){
//       //     return bluebird.reject(err);
//       //   }
//       // // });
//       });
//   });
//     // .catch(err => bluebird.reject(err));
// };

storage.deleteItem = function(id){
  del([`${__dirname}/../data/${id}.json`])
  .then( paths => {
    console.log('Deleted file: ', `${id}.json`);
  })
  .catch(err => bluebird.reject(err));
};

module.exports = storage;
