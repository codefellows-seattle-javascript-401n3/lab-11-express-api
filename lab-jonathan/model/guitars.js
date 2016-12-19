let uuid = require('node-uuid');
let storage = require('../lib/storage');
let createError = require('http-errors');


//Object Constructor with a unique ID property.
function Guitar(make, model) {
  if (!make) throw createError(400, 'make expected');
  if (!model) throw createError(400, 'model expected');
  this.make = make,
  this.model = model,
  this.id = uuid.v1(4);
}

Guitar.create = (_guitar) => {
  try {
    let guitar = new Guitar(_guitar);
    return storage.createItem(guitar);
  }
  catch(err) {
    return Promise.reject;
  }
};

Guitar.fetch = (id) => {
  return storage.fetchItem('guitar', id);
};


module.exports = Guitar;
