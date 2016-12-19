// let recipes = [
//  {name: 'breakfast casserole', content: 'this is some content', mealType: 'breakfast'},
//  {name: 'pancakes', content: 'this is some content', mealType: 'breakfast'},
//  {name: 'ham sandwich', content: 'this is some content', mealType: 'lunch'},
//  {name: 'tomato soup', content: 'this is some content', mealType: 'soup'},
//  {name: 'chicken marsala', content: 'this is some content', mealType: 'dinner'},
// ];
let storage = require('../lib/storage.js');
// let Router = require('express').Router;
// let jsonParser = require('body-parser').json();

let Recipe = require('../model/recipe.js');
// let router = new Router();

module.exports = function(router){

  router.get('/api/recipe', function(req, res) {
    storage.fetchAll('recipe', req.params.id)
      .then(recipe => {
        res.json(recipe);
      })
      .catch( err => {
        console.error(err);
        res.status(404).send('not found');
      });
    // res.status(400).send('bad request');
  });

  router.get('/api/recipe/:id', function(req, res) {
    if (req.params.id) {
      storage.fetchItem('recipe', req.params.id)
      .then(recipe => {
        res.json(recipe);
      })
      .catch( err => {
        console.error(err);
        res.status(404).send('not found');
      });
      return;
    }
  });

  router.post('/api/recipe', function(req, res) {
      var recipe = new Recipe(req.body.name, req.body.content, req.body.mealType);
      storage.createItem('recipe', recipe)
      .then( recipe => {
        res.json(recipe);
      })
      .catch( () => {
        res.status(400).send('bad request');
      });
  });

  // router.post('/api/recipe', function(req, res) {
  //   res.status(400).send('bad request');
  // });

  router.put('/api/recipe/:id', function(req, res) {
    if(req.params.id) {
      storage.updateItem('recipe', req.params.id, req.body.name, req.body.content, req.body.mealType)
      .then(recipe => {
        res.json(recipe);
      })
      .catch(err => {
        console.error(err);
        res.status(400).send('bad request');
      });
    }
  });

  router.put('/api/recipe', function(req, res) {
    res.status(400).send('bad request');
  });

  router.delete('/api/recipe/:id', function(req, res) {
    if (req.params.id) {
      storage.deleteItem('recipe', req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(err => {
        console.error(err);
        res.status(404).send('not found' + '\n');
      });
    }
  });

  router.delete('/api/recipe', function(req, res) {
    res.status(400).send('bad request');
  });
};