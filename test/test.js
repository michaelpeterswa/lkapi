// letterkennyQuotes api
// TESTING FILE
// Michael Peters

var request = require('supertest');
var app = require('../src/server.js');

describe('GET /', function() {
    it('main webpage responds with html and status 200', function(done) {
 //navigate to root and check the the response is "hello world"
    request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });
});

describe('GET /api', function() {
    it('main endpoint responds with valid json api output', function(done) {
 //navigate to root and check the the response is "hello world"
    request(app)
        .get('/api')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /api-sfw', function() {
    it('main endpoint responds with valid sfw json api output', function(done) {
    //navigate to root and check the the response is "hello world"
    request(app)
        .get('/api-sfw')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /api-nsfw', function() {
    it('main endpoint responds with valid nsfw json api output', function(done) {
    //navigate to root and check the the response is "hello world"
    request(app)
        .get('/api-nsfw')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});