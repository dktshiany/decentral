// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../index';

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Services", () => {
  describe("GET /", () => {

      // Test to get all market pairs from the remote setver
      it("should get all market pairs", (done) => {
           chai.request(app)
               .get('/marketapi')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   done();
                });
       });

       // Test to get all market pairs from the remote server
       // Here they are sorted by GainInPercentage
      it("should get all market pairs", (done) => {
        chai.request(app)
            .get('/marketapi?act=GainInPercentage&dir=asc')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
             });
      });

      // Test to get the app      
      it("should get the angular app", (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);                
                done();
             });
      });

      // Test route      
      it("should get the test route message", (done) => {
        chai.request(app)
            .get('/test_route')
            .end((err, res) => {
                res.should.have.status(200);             
                done();
             });
      });
  });
});