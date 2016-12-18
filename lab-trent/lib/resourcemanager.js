'use strict';

const fs = require('fs');

const DATA_PATH = './data';

let resourceCache = { };

exports.addResource = function(resource) {
  resourceCache[resource.id] = resource;
  fs.writeFile(DATA_PATH + '/' + resource.id + '.json', JSON.stringify(resource), function(err) {
    if (err) throw err;
  });
};

exports.deleteResource = function(resource) {
  delete resourceCache[resource.id];
};

exports.getResource = function(id, callback) {
  if (resourceCache[id]) return resourceCache[id];
  fs.readFile(DATA_PATH + '/' + id + '.json', function(err, data) {
    if (err) return callback(err);
    if (data) {
      resourceCache[id] = JSON.parse(data);
      callback(null, resourceCache[id]);
    } else {
      callback(null, null);
    }
  });
};

exports.getResourceIdList = function() {
  return fs.readdirSync(DATA_PATH).map(function(name) {
    return name.replace('.json', '');
  });
};
