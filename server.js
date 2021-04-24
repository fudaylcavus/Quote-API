const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`We're now listening on port ${PORT}`)
})

app.get('/api/quotes/random', (req, res, next) => {
    let randomQuote = getRandomElement(quotes);
    let responseObj = { quote: randomQuote }
    res.send(responseObj);
})

app.get('/api/quotes', (req, res, next) => {
    let { person } = req.query

    if (person) {
        let personsQuotes = quotes.filter(quote => quote.person === person)
        res.send({ quotes: personsQuotes })
    } else {
        res.send({ quotes })
    }

})

app.post('/api/quotes', (req, res, next) => {
    let { person, quote } = req.query
    if (!person || !quote) {
        res.status(400).send()
    } else {
        let newQuote = { quote, person }
        quotes.push(newQuote)
        res.send({quote: newQuote});
    }
})