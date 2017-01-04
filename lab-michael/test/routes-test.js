'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const storage = require('../lib/storage.js');
const Recipe = require('../model/recipe.js');

require('../server.js');



describe('Testing the recipe routes', function() {

  describe('Testing Invalid Routes', function() {
    it('should return error bad route', function(done) {
      request.get('localhost:3000/api/recipeisee')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('Testing Valid Routes', function() {
    it('should call the root directory /api/recipe', function(done) {
      request.get('localhost:3000/api/recipe')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('GET TEST /api/recipe', function() {
    before(function(done) {
      let recipe = new Recipe('porkchop sandwiches', 'something here', 'dinner')
      storage.createItem('recipe', recipe)
      .then( recipe => {
        this.recipe = recipe;
        done();
      })
    })
    it('should .GET the recipe by ID it was assigned', function(done) {
      request.get(`localhost:3000/api/recipe/${this.recipe.id}`)
      .end((err, res) => {
        // console.log('hello');
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('porkchop sandwiches');
        expect(res.body.content).to.equal('something here');
        expect(res.body.mealType).to.equal('dinner');
        done();
      });
    });
    describe('testing PUT /api/recipe', function() {
      it('should respond with 200 for a put with a valid body and should change storage', function(done) {
        request.put(`localhost:3000/api/recipe/${this.recipe.id}`)
        .send({name: 'meatloaf', content: 'beef', mealType: 'dinner'})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('meatloaf');
          expect(res.body.content).to.equal('beef');
          expect(res.body.mealType).to.equal('dinner');
          done();
        });
      });
      // describe('POST TEST /api/recipe', function() {
      //   it('should create a new recipe', function(done) {
      //     request.post(`localhost:3000/api/recipe/`)
      //     .send({name: 'porkchop sandwiches', content: 'something here', mealType: 'dinner'})
      //     .end((err, res) => {
      //       if (err) return done(err);
      //       expect(res.status).to.equal(200);
      //       expect(res.body.name).to.equal('porkchop sandwiches');
      //       expect(res.body.content).to.equal('something here');
      //       expect(res.body.mealType).to.equal('dinner');
      //       console.log(this.recipe.id);
      //       done();
      //     });
      //   });
      // });
    });
    after(function(done) {
      // console.log('after called');
      console.log(this.recipe.id);
      storage.deleteItem('recipe', this.recipe.id)
      .then(() => {
        // console.log('done called');
        done();
      })
    })
  });


//
});
