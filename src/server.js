// letterkennyQuotes api
// Michael Peters
// July 12, 2019
// revived in time for Season 9 -- December 16, 2020

const express = require('express')
var cors = require('cors')
var fs = require('fs')
var path = require('path');

const app = express()

const mainPath = "./resources/main.json"

//port the app is currently serving to
const port = 6969

var content
var quote
var sfw
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

/// Read from the main.json file //
readFileWithPathAndContent(mainPath, function(response){
    content = response
    })
////////////////////////////////

function generateRandomWithLength(length){
    var randomNum = Math.floor(Math.random() * length)
    return randomNum
}

function setQuoteAndData(num, quoteData){
        quote = quoteData[0]
        id = num
        sfw = quoteData[1]    
}

function processFile(message, status) {
    var data = JSON.parse(message)
    var length = data.all.length
    var randomNum = generateRandomWithLength(length)
    data = data.all
    if (status === "all"){
        var randomQuote = data[randomNum]
        setQuoteAndData(randomNum, randomQuote)
    }
    else if (status === "sfw"){
        randomQuote = data[randomNum]
        while(randomQuote[1] != "sfw"){
            randomNum = generateRandomWithLength(length)
            randomQuote = data[randomNum]
        }
        setQuoteAndData(randomNum, randomQuote)      
    }
    else {
        randomQuote = data[randomNum]
        while(randomQuote[1] != "nsfw"){
            randomNum = generateRandomWithLength(length)
            randomQuote = data[randomNum]
        }
        setQuoteAndData(randomNum, randomQuote)
    }
}

app.use(cors());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/index.html'));
  });

//lkapi main endpoint (JSON)
app.get('/api', function (req, res) {
    processFile(content, "all")
    res.status(200).json({
    quote: quote,
    id: id,
    sfw: sfw
    })
})
app.get('/sfw', function (req, res) {
    processFile(content, "sfw")
    res.status(200).json({
    quote: quote,
    id: id,
    sfw: sfw
    })
})
app.get('/nsfw', function (req, res) {
    processFile(content, "nsfw")
    res.status(200).json({
    quote: quote,
    id: id,
    sfw: sfw
    })
})

app.get('/styles/styles.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/styles/styles.css'));
  });

app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname + '/../html/404.html'));
})

const server = app.listen(port, () => console.log(`LetterkennyAPI server app listening on port ${port}!\n`))

module.exports = server