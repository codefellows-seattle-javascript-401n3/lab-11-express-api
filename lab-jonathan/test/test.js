let request = require('superagent');
let expect = require('chai').expect;
require('../index.js');


describe('testing guitar rotues', function(){

//test POST errors/messages
  describe('testing POST /api/guitars for response 200', function(){
    it('should return a guitar', function(done){
      request.post('localhost:3000/api/guitars')
      .send({name: 'GUITAR MAKE', toy: 'GUITAR MODEL'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.make).to.equal('GUITAR MAKE');
        expect(res.body.model).to.equal('GUITAR MODEL');
        done();
      });
    });
  });

  describe('testing POST /api/guitars for message 400', function(){
    it('should responds with "bad request" for if no body provided or invalid body provided', function(done){
      request.post('localhost:3000/api/guitars?id=1')
      .send({make: 'fender'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
//
//testing GET errors/messages
  describe('testing GET /api/guitars responsd with 200', function(){
    it('should return a guitar', function(done){
      request.get('localhost:3000/api/guitars?id=1')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body[0].make).to.equal('Gibson');
        expect(res.body[0].model).to.equal('les paul');
        done();
      });
    });
  });
//
  describe('testing GET /api/guitars respond with 400 "bad request" if no id was provided in the request', function(){
    it('should return a 400 bad request error', function(done){
      request.get('localhost:3000/api/guitars')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
//
  describe('testing GET /api/guitars responds with 404 "not found" for valid request made with an id that was not found' ,function(){
    it('should return a 404 not found error', function(done){
      request.get('localhost:3000/api/guitars?id=ibanez')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });


});
