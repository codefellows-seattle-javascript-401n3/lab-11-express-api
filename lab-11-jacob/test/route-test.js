const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing user routes', function() {
  describe('testing POST /api/users', function() {
    it('should return a user', function(done) {
      request.post('http://localhost:3000/api/users')
        .send({username: 'Nedrick' })
        .end((err, res) => {
          if (err) return done (err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal('Nedrick');
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
          expect(res.badRequest).to.equal(true);
          done();
        });
    });
  });
  describe('testing GET /api/users', function() {
    it('should retrieve user information based on a querystring', function(done) {
      request.get('http://localhost:3000/api/users?id=user_358d472e-2459-4dcc-9c8f-f65fc541a47d')
        .end((err, res) => {
          if (err) return done(err);
          let userObj = JSON.parse(res.text);
          expect(res.status).to.equal(200);
          expect(userObj.username).to.equal('Nedrick'); //tried another name and it failed (as it should)
          done();
        });
    });
    it('should should respond with "not found" for valid request made with id that was not found', function(done) {
      request.get('http://localhost:3000/api/users?id=fiddlesticks')
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
  describe('The PUT function for /api/users', function() {
    it('should return a status of 200 when a valid user route is hit on a put request', function(done) {
      request.put('http://localhost:3000/api/users?id=user_769f7aa0-2f56-415b-9e28-3d3e2ad67551')
      .send({username: 'Spiff'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('Spiff');
        done();
      });
    });
    it('should return a status of 400 for a put request with an invalid body', function(done) {
      request.put('not a valid body!')
      .send('still not valid!')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});
