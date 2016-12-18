'use strict';

require('isomorphic-fetch');

const expect = require('chai').expect;

require('../index');

let testId = '';

describe('Statshots API', function() {
  describe('GET /statshots', function() {
    it('should send an array of resource ids that are in the data folder.', function(done) {
      fetch('http://localhost:3000/api/statshots').then(function(res) {
        expect(res.status).to.equal(200);
        return res.json();
      }).then(function(res) {
        expect(res instanceof Array).to.equal(true);
        done();
      });
    });
  });
  describe('POST /statshots', function() {
    it('should create a new statshot, add it to the resource manager and send back the object.', function(done) {
      fetch('http://localhost:3000/api/statshots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:'Trent', stats:'5000' }),
      }).then(function(res) {
        expect(res.status).to.equal(200);
        return res.json();
      }).then(function(res) {
        expect(res.username).to.equal('Trent');
        expect(res.stats).to.equal('5000');
        testId = res.id;
        done();
      });
    });
  });
  describe('GET /statshots:id', function() {
    it('should return a 404 when an invalid id is given', function(done) {
      fetch('http://localhost:3000/api/statshots/203f2930ksdk02fk9').then(function(res) {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should return the statshot posted above.', function(done) {
      fetch('http://localhost:3000/api/statshots/' + testId).then(function(res) {
        expect(res.status).to.equal(200);
        return res.json();
      }).then(function(res) {
        expect(res.username).to.equal('Trent');
        expect(res.stats).to.equal('5000');
        done();
      });
    });
  });
});
