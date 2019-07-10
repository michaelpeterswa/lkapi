// letterkennyQuotes api
// Michael Peters

const express = require('express');
var cors = require('cors');
const app = express();

//port the app is currently serving to
const port = 6969;

app.use(cors());

//lkapi main endpoint (JSON)
app.get('/', (req, res) => res.send('LetterkennyAPI'))

//SFW endpoint (JSON)
app.get('/sfw', (req, res) => res.send('LetterkennyAPI Safe-For-Work'))

//NSFW endpoint (JSON)
app.get('/nsfw', (req, res) => res.send('LetterkennyAPI Not-Safe-For-Work'))

app.listen(port, () => console.log(`LetterkennyAPI server app listening on port ${port}!`))

app.use(function (req, res, next) {
    res.status(404).send("404 - Nothing at this address!")
  })