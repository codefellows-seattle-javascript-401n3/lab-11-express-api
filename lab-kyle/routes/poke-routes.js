'use strict';

const storage = require('../lib/storage');
const Pokemon = require('../model/resource');

module.exports = (router) => {
  router.get('/api/pokemon', (req, res) => {
    storage.fetchAll('pokemon')
      .then( data => {
        res.json(data);
      })
      .catch(() => {
        res.status(404).send('not found');
      });
  });

  router.get('/api/pokemon/:id', (req, res) => {
    storage.fetchItem('pokemon', req.params.id)
      .then( pokemon => {
        res.json(pokemon);
      })
      .catch( () => {
        res.status(404).send('not found');
      });
  });

  router.post('/api/pokemon', function(req, res) {
    let pokemon = new Pokemon(req.body.name, req.body.color);
    storage.createItem('pokemon', pokemon)
      .then( pokemon => {
        res.json(pokemon);
      })
      .catch( () => {
        res.status(400).send('bad request');
      });
  });

  router.delete('/api/pokemon/:id', function(req, res) {
    if (req.params.id) {
      storage.deleteItem('pokemon', req.params.id)
        .then( data => {
          res.status(204).send(data);
        })
        .catch( () => {
          res.status(404).send('not found');
        });
      return;
    }
    res.status(404).send('not found');
  });

};
