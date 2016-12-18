'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing song routes', function(){
  var song = null;

  describe('testing unregistered routes', function(){
    it('should return a status of 404', function(done){
      request.get('localhost:3000/api/books')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Cannot GET /api/books');
        expect(err).to.not.equal(null);
        done();
      });
    });

//post
    describe('testing POST /api/song', function(){
      it('should return a song', function(done){
        request.post('localhost:3000/api/song')
      .send({title: 'stuff', artist: 'tay'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('stuff');
        expect(res.body.artist).to.equal('tay');
        song = res.body;
        done();
      });
      });
      it('Should return a 400 error for bad object passing', function(done) {
        request.post('localhost:3000/api/song')
        .send({title: 'stuff', type: 'pop'})
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.text).to.equal('InternalServerError');
          expect(err).to.not.equal(null);
          done();
        });
      });
      it('Should return a 500 error for no object', function(done) {
        request.post('localhost:3000/api/song')
          .end((err, res) => {
            expect(res.status).to.equal(500);
            expect(res.text).to.equal('InternalServerError');
            expect(err).to.not.equal(null);
            done();
          });
      });
    });

  //get
    describe('testing GET /api/song', function(){
      it('should return a song', function(done){
        request.get(`localhost:3000/api/song?id=${song.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('stuff');
          expect(res.body.artist).to.equal('tay');
          done();
        });
      });
      it('should have a return status of 404', function(done){
        request.get('localhost:3000/api/song?id=87')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          expect(err).to.not.equal(null);
          done();
        });
      });
      it('should have a return status of 400', function(done){
        request.get('localhost:3000/api/song')
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.text).to.equal('InternalServerError');
          expect(err).to.not.equal(null);
          done();
        });
      });
    });
  });
});
