// let app = require('../server');
// let chai = require('chai');
// let request = require('supertest');
// let server = require('../server');

// let expect = chai.expect;

var app = require('../server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('get user', function() {
  it('should return 200', function(done) {
    request(app)
      .get('/user')
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});


describe('get item', function() {
    it('should return 200', function(done) {
      request(app)
        .get('/item')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

 describe('Registration Tests', function() {
    it('should return the user if the username is valid', function(done) {
      request(app)
      .post('/user')
      .send({username:'aya'})
      .end(function(err, res) {

      console.log(res.body[0].username)
      expect(res.body[0].username).to.be.equal("m");
      // //  expect(res.body).to.eql('aya');
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });


 describe(' GET all the users', function() {
    it('it should GET all the users', function(done) {
      request(app)
        .get('/user')
        .end(function(err, res) {
          console.log(typeof(res.body))
          //res.body.should.be.a('object')
         // res.body.should.a('array');
         expect(typeof(res.body)).to.be.equal("object");
          done();
        });
    });
  });

 describe(' GET  items ', function() {
    it('it should GET all the items', function(done) {
      request(app)
        .get('/item')
        .end(function(err, res) {
          console.log(typeof(res.body))
          //res.body.should.be.a('object')
         // res.body.should.a('array');
         expect(typeof(res.body)).to.be.equal("object");
          done();
        });
    });
  });









