//one it block per route. Do a fetch and then say it should yadda yadda
const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');
// var user = null; //I only user this for the non-persistence test

describe('testing user routes', function() {
  describe('testing POST /api/users', function() {
    it('should return a user', function(done) {
      request.post('http://localhost:3000/api/users')
      .send({username: 'Nedrick' })
      .end((err, res) => {
        if (err) return done (err);
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('Nedrick'); // tried another name and it failed (as it should)
        // user = res.body; //once again, only non-persistence.
        done();
      });
    });
    it('should respond with a 400 error if there is no body in the req', function(done) {
      request.post('http://localhost:3000/api/users')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('include body');
        done();
      });
    });
    it('should respond with a 400 error if there is an invalid body in the req', function(done) {
      request.post('http://localhost:3000/api/users')
      .send('akdjfhkha')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });
  describe('testing GET /api/users', function() {
    it('should retrieve user information based on a querystring', function(done) {
      request.get('http://localhost:3000/api/users?id=user_02987197-6e7a-4abc-9bc6-0a4270b6cb30') //this is for persistence
      // request.get(`http://localhost:3000/api/users?id=${user.id}`) //this is for my non-persistence test. and it passes!
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('Nedrick'); //tried another name and it failed (as it should)
        done();
      });
    });
    it('should should respond with "not found" for valid request made with id that was not found', function(done) {
      request.get('http://localhost:3000/api/users?id=1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should should respond with "bad request" if no id provided in request', function(done) {
      request.get('http://localhost:3000/api/users?cheese=gouda')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  // describe();
});
