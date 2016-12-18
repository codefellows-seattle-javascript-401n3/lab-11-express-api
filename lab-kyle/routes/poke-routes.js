'use strict';

const storage = require('../lib/storage');
const response = require('../lib/response');
const Pokemon = require('../model/resource');

module.exports = function(router){
  router.get('/api/pokemon', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('pokemon', req.url.query.id)
        .then( pokemon => {
          response.sendJSON(res, 200, pokemon);
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 404, 'not found');
        });
      return;
    } else if (!req.url.query.id) {
      storage.fetchAll('pokemon')
        .then( data => {
          console.log(data);
          response.sendJSON(res, 200, data);
        })
        .catch(err => {
          console.error(err);
          response.sendText(res, 404, 'not found');
        });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/pokemon', function(req, res) {
    let pokemon = new Pokemon(req.body.name, req.body.color);
    storage.createItem('pokemon', pokemon)
      .then( pokemon => {
        response.sendJSON(res, 200, pokemon);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 400, 'bad request');
      });
  });

  router.delete('/api/pokemon', function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem('pokemon', req.url.query.id)
        .then( data => {
          response.sendText(res, 204, data);
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 404, 'not found');
        });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
