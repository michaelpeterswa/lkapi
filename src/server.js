// letterkennyQuotes api
// Michael Peters
// July 12, 2019

const express = require('express')
var cors = require('cors')
var fs = require('fs')
var path = require('path');

const app = express()

const mainPath = "./resources/main.json"
const sfwPath = "./resources/sfw.json"
const nsfwPath = "./resources/nsfw.json"
const brokenPath = "./resources/nonexistant.json"
//const json = JSON.parse(full);

//port the app is currently serving to
const port = 6969

var content
var contentSFW
var contentNSFW
var contentBroken
var quote
var id = 0

// eslint-disable-next-line no-unused-vars
function readFileWithPathAndContent(path, callback) {
    fs.readFile(path, 'utf8', function read(err, data) {
        if (err) {
            data = "[\"an error occured - file not found\"]"
        }
        return callback(data)
    })
    
}

/// Read from the three files //
readFileWithPathAndContent(mainPath, function(response){
    content = response
    })
readFileWithPathAndContent(sfwPath, function(response){
    contentSFW = response
    })
readFileWithPathAndContent(nsfwPath, function(response){
    contentNSFW = response
    })
readFileWithPathAndContent(brokenPath, function(response){
    contentBroken = response
    })
////////////////////////////////

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
    // if (quote == "an error occured - file not found"){
    //     res.status(501).send('501 - json file not found.')
    // }
    // else {
    res.status(200).json({
    quote: quote,
    id: id,
    sfw: "maybe"
    })
    // }
})

//SFW endpoint (JSON)
app.get('/api-sfw', function (req, res) {
    processFile(contentSFW)
    console.log("sfw request made")
    // if (quote == "an error occured - file not found"){
    //     res.status(501).send('501 - json file not found.')
    // }
    // else {
    res.status(200).json({
    quote: quote,
    id: id,
    sfw: "yes"
    })
    // }
})

//NSFW endpoint (JSON)
app.get('/api-nsfw', function (req, res) {
    processFile(contentNSFW)
    console.log("nsfw request made")
    // if (quote == "an error occured - file not found"){
    //     res.status(501).send('501 - json file not found.')
    // }
    // else {
    res.status(200).json({
    quote: quote,
    id: id,
    sfw: "no"
    })
    // }
})

//broken endpoint (JSON -- TESTING ONLY)
app.get('/api-broken', function (req, res) {
    processFile(contentBroken)
    console.log("broken request made")
    
    //if is guaranteed in this case
    //if (quote == "an error occured - file not found"){
    res.status(501).send('501 - json file not found.')
    //}
    
    // else {
    // res.status(200).json({
    // quote: quote,
    // id: id,
    // sfw: "no"
    // })
    // }
})

app.get('/styles/styles.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/styles/styles.css'));
  });

const server = app.listen(port, () => console.log(`LetterkennyAPI server app listening on port ${port}!\n`))

app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname + '/../html/404.html'));
    res.status(404).sendFile(path.join(__dirname + '/../html/styles/styles.css'));
  })

module.exports = server