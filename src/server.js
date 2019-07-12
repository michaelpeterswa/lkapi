// letterkennyQuotes api
// Michael Peters

const express = require('express')
var cors = require('cors')
var fs = require('fs')
var path = require('path');

const app = express()

const mainPath = "./resources/main.json"
const sfwPath = "./resources/sfw.json"
const nsfwPath = "./resources/nsfw.json"
//const json = JSON.parse(full);

//port the app is currently serving to
const port = 6969

var content
var contentSFW
var contentNSFW
var quote
var id = 0
// First I want to read the file
fs.readFile(mainPath, 'utf8', function read(err, data) {
    if (err) {
        throw err
    }
    content = data
})
//nsfw
fs.readFile(nsfwPath, 'utf8', function read(err, data) {
    if (err) {
        throw err
    }
    contentNSFW = data
})
//sfw
fs.readFile(sfwPath, 'utf8', function read(err, data) {
    if (err) {
        throw err
    }
    contentSFW = data
})

function processFile(message) {
    var data = JSON.parse(message)
    var length = data.length
    var randomNum = Math.floor(Math.random() * length)
    var randomQuote = data[randomNum]
    quote = randomQuote
    id = randomNum
}

app.use(cors());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/index.html'));
  });

//lkapi main endpoint (JSON)
app.get('/api', function (req, res) {
    processFile(content)
    console.log("main request made")
    res.status(200).json({
    quote: quote,
    id: id,
    sfw: "maybe"
})})

//SFW endpoint (JSON)
app.get('/api-sfw', function (req, res) {
    processFile(contentSFW)
    console.log("sfw request made")
    res.status(200).json({
    quote: quote,
    id: id,
    sfw: "yes"
})})

//NSFW endpoint (JSON)
app.get('/api-nsfw', function (req, res) {
    processFile(contentNSFW)
    console.log("nsfw request made")
    res.status(200).json({
    quote: quote,
    id: id,
    sfw: "no"
})})

app.get('/styles/styles.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/styles/styles.css'));
  });

const server = app.listen(port, () => console.log(`LetterkennyAPI server app listening on port ${port}!\n`))

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname + '/../html/404.html'));
    res.status(404).sendFile(path.join(__dirname + '/../html/styles/styles.css'));
  })

module.exports = server