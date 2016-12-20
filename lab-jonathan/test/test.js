let request = require('superagent');
let expect = require('chai').expect;
require('../index.js');


describe('testing guitar rotues', function(){

  it('should return 404 for an unregistered route', function(done) {
    request.get('localhost:9000/stuff')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });


// test POST errors/messages
  describe('testing POST /api/guitars for response 200', function(){
    it('should return a guitar', function(done){
      request.post('localhost:9000/api/guitars')
      .send({make: 'GUITAR MAKE', model: 'GUITAR MODEL'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.make).to.equal('GUITAR MAKE');
        expect(res.body.model).to.equal('GUITAR MODEL');
        done();
      });
    });

    it('should responds with "bad request" for if no body provided or invalid body provided', function(done){
      request.post('localhost:9000/api/guitars')
      .send({make: 'fender'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
});


// testing GET errors/messages
  describe('testing GET /api/guitars responsd with 200', function(){
    it('provided an id it should return a guitar', function(done){
      request.get('localhost:9000/api/guitars/2')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.make).to.equal('Ibanez');
        expect(res.body.model).to.equal('ibanezTEST');
        done();
      });
    });

    it('should return a 400 bad request error if no ide was provided', function(done){
      request.get('localhost:9000/api/guitars/')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return a 404 not found error if the id was not found' , function(done){
      request.get('localhost:9000/api/guitars/ibanez')
      .end((err, res) => {
        //expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });


  });

  describe('testing PUT /api/guitars/:id', function(){
    it('should return an updated guitar', function(done){
      request.put('localhost:9000/api/guitars/4')
      .send({make: 'GUITARMAKE', model: 'GUITARMODEL'})
      .end((err, res) => {
        let body = JSON.parse(res.body);
        expect(res.status).to.equal(200);
        expect(body.make).to.equal('GUITARMAKE');
        expect(body.model).to.equal('GUITARMODEL');
        done();
      });
    });

    it('should responds with "bad request" for if no body provided', function(done){
      request.put('localhost:9000/api/guitars/1')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('Bad Request');
        done();
      });
    });

    it('should responds with "bad request" for if invalid body provided', function(done){
      request.put('localhost:9000/api/guitars?id=1')
      .send('45245234erwdfgadsf')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('Bad Request');
        done();
      });
    });
  });



//DELETE tests
  describe('testing DELETE /api/guitars/:id', function(){
    it('should respond with 204 if there is no content in the response body', function(done){
      request.delete('localhost:9000/api/guitars/2')
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body).to.deep.equal({});
        done();
      });

      //maybe create a before to write the test file before this runs.
    });

    it('should respond with 404 if a bad id is provided', function(done){
      request.delete('localhost:9000/api/guitars/things')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.msg).to.equal('Not Found');
        done();

        //if it's looking for 400 error and getting 200 error, need to test the function in curl to make sure the right things are running in the right order.
      });
    });

    it('should respond with 404 bad request if no id is provided', function(done){
      request.delete('localhost:9000/api/guitars')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Not Found');
        done();
      });
    });
  });




//end of file
});










//delete tests
//DELETE - test 404, for a DELETE request with an invalid or missing id
// 404 for missing id because DELETE /api/<simple-resource-name>/ is not a route
// DELETE - test 204, with an empty response body for DELETE request with a valid id
