/* eslint-disable no-undef */
// letterkennyQuotes api
// TESTING FILE
// Michael Peters

var request = require('supertest');
var app = require('../src/server.js');

describe('GET /', function() {
    it('main webpage responds with html and status 200', function(done) {
    request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });
});

describe('GET /api', function() {
    it('main endpoint responds with valid json api output', function(done) {
    request(app)
        .get('/api')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /api-sfw', function() {
    it('main endpoint responds with valid sfw json api output', function(done) {
    request(app)
        .get('/api-sfw')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('GET /api-nsfw', function() {
    it('main endpoint responds with valid nsfw json api output', function(done) {
    request(app)
        .get('/api-nsfw')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});


describe('GET /test', function() {
    it('tests an invalid link and ensures status 404', function(done) {
    request(app)
        .get('/test')
        .expect('Content-Type', /html/)
        .expect(404, done);
    });
});

describe('GET /styles/styles.css', function() {
    it('tests for presence of stylesheet', function(done) {
    request(app)
        .get('/styles/styles.css')
        .expect('Content-Type', /css/)
        .expect(200, done);
    });
});

describe('GET /api-broken', function() {
    it('ensure error functions work', function(done) {
    request(app)
        .get('/api-broken')
        .expect('Content-Type', /html/)
        .expect(501, done);
    });
});