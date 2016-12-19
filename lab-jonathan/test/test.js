let request = require('superagent');
let expect = require('chai').expect;
require('../server.js');


describe('testing dog rotues', function(){

//test POST errors/messages
  describe('testing POST /api/dogs for response 200', function(){
    it('should return a dog', function(done){
      request.post('localhost:3000/api/dogs')
      .send({name: 'DOG NAME', toy: 'FAVORITE TOY'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('DOG NAME');
        expect(res.body.toy).to.equal('FAVORITE TOY');
        done();
      });
    });
  });

  describe('testing POST /api/dogs for message 400', function(){
    it('should responds with "bad request" for if no body provided or invalid body provided', function(done){
      request.post('localhost:3000/api/dogs?id=1')
      .send({name: 'pixie'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
//
//testing GET errors/messages
  describe('testing GET /api/dogs responsd with 200', function(){
    it('should return a dog', function(done){
      request.get('localhost:3000/api/dogs?id=1')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body[0].name).to.equal('Pig');
        expect(res.body[0].toy).to.equal('chew bone');
        done();
      });
    });
  });
//
  describe('testing GET /api/dogs respond with 400 "bad request" if no id was provided in the request', function(){
    it('should return a 400 bad request error', function(done){
      request.get('localhost:3000/api/dogs')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
//
  describe('testing GET /api/dogs responds with 404 "not found" for valid request made with an id that was not found' ,function(){
    it('should return a 404 not found error', function(done){
      request.get('localhost:3000/api/dogs?id=apple')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });


});
