'use strict';

let request = require('superagent');
let expect = require('chai').expect;

const server = require('../server.js');
const port = process.env.PORT || 3000;
let url = 'http://localhost:3000/api';

describe('a restful endpoint', function() {

  var pokemon = null;

  before(function(done) {
    server.listen(port);
    done();
  });
  after(function(done) {
    server.close();
    done();
  });

  describe('unregistered route', function() {
    it('will respond 404', function(done) {
      request.get(`${url}/pokemon/fail`)
      .end(function(err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('POST /api/pokemon', function() {
    it('can create a pokemon', function(done) {
      request.post(`${url}/pokemon`)
      .set('content-type', 'application/json')
      .send('{"name": "Bulbasaur", "color": "green"}')
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Bulbasaur');
        expect(res.body.color).to.equal('green');
        pokemon = res.body;
        done();
      });
    });
    it('will respond with bad request if no body data provided', function(done) {
      request.post(`${url}/pokemon`)
      .end(function(err, res) {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
    it('will respond with bad request if incorrect body data provided', function(done) {
      request.post(`${url}/pokemon`)
      .send({'incorrect': 'data'})
      .end(function(err, res) {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('GET /api/pokemon', function() {
    it('can fetch a pokemon', function(done) {
      request.get(`${url}/pokemon?id=${pokemon.id}`)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Bulbasaur');
        expect(res.body.color).to.equal('green');
        done();
      });
    });
    it('will respond "not found" with invalid id', function(done) {
      request.get(`${url}/pokemon?id=123456789`)
      .end(function(err, res) {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });
    it('will respond with a list of ids if no id is provided', function(done) {
      request.get(`${url}/pokemon`)
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(typeof res.body).to.equal('object');
        done();
      });
    });
  });

  describe('DELETE /api/pokemon', function() {
    it('can delete a pokemon', function(done) {
      request.delete(`${url}/pokemon?id=${pokemon.id}`)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });
});
