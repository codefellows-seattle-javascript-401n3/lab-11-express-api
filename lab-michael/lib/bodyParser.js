'use strict';

module.exports = function(req) {
  // console.log(req);
  return new Promise((resolve, reject) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      console.log('parsing the body');
      req.body = '';
      req.on('data', data => {
        req.body += data.toString();
      });
      req.on('end', () => {
        try {
          // console.log(req.body);
          req.body = JSON.parse(req.body);
          resolve(req);

        }
        catch(err) {
          reject(err);
        }
      });
      req.on('error', err => {
        console.error(err);
        reject(err);
      });
      return;
    }
    resolve();
  });
};