'use strict';

const Song = require('../model/song.js');
const storage = require('../lib/storage.js');

module.exports = function(router){

  router.get('/api/song/:id', function(req, res) {
    if (req.params.id) {
      storage.fetchItem('song', req.params.id)
      .then( song => {
        res.json(song);
      })
      .catch( err => {
        console.error(err);
        res.status(404).send('not found');
      });
      return;
    }
  });

  router.post('/api/song', function(req,res) {
    try {
      var song = new Song(req.body.title, req.body.artist);
      storage.createItem('song', song);
      res.json(song);
    } catch (err) {
      console.error(err);
      res.status(400).send('bad request');
    }
  });

  router.put('/api/song/:id', function(req, res){
    if(req.params.id){
      storage.updateItem('song', req.params.id, req.body.title, req.body.artist)
      .then(song => {
        res.json(song);
      }).catch(err => {
        console.error(err);
        res.status(400).send('bad request');
      });
    }
  });

  router.delete('/api/song/:id', function(req, res){
    if(req.params.id){
      storage.deleteItem('song', req.params.id)
      .then(() => {
        res.status(204).end();
      }).catch(err => {
        console.error(err);
        res.status(404).send('not found');
      });
    }
  });
  router.delete('/api/songs', function(req, res){
    res.status(404).send('not found');
  });
};
