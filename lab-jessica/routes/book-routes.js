'use strict';

const storage = require('../lib/storage.js');
const Book = require('../model/book.js');

module.exports = function(router){

  router.get('/api/books', function(req, res) {
    res.status(400).send('bad request');
  });

  router.get('/api/books/:id', function(req, res) {
    if (req.params.id) {
      storage.fetchItem('book', req.params.id)
      .then(book => {
        res.json(book);
      })
      .catch( err => {
        console.error(err);
        res.status(404).send('not found');
      });
      return;
    }
  });

  router.post('/api/books', function(req, res) {
    try {
      var book = new Book(req.body.title, req.body.author);
      storage.createItem('book', book);
      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(400).send('bad request');
    }
  });

  router.post('/api/books', function(req, res) {
    res.status(400).send('bad request');
  });

  router.put('/api/books/:id', function(req, res) {
    if(req.params.id) {
      storage.updateItem('book', req.params.id, req.body.title, req.body.author)
      .then(book => {
        res.json(book);
      })
      .catch(err => {
        console.error(err);
        res.status(400).send('bad request');
      });
    }
  });

  router.put('/api/books', function(req, res) {
    res.status(400).send('bad request');
  });

  router.delete('/api/books/:id', function(req, res) {
    if (req.params.id) {
      storage.deleteItem('book', req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(err => {
        console.error(err);
        res.status(404).send('not found' + '\n');
      });
    }
  });

  router.delete('/api/books', function(req, res) {
    res.status(400).send('bad request');
  });
};
