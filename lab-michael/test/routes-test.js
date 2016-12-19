'use strict';

const expect = require('chai').expect;
const request = require('superagent');

require('../server.js');


describe('Testing the recipe routes', function() {

  it('should show 404 for bad id', function(done) {
    request.get('http://localhost:3000/api/recipeisee')
    .end((err, res)=> {
      expect(res.status).to.equal(404);
      done();
    });
  });
});
