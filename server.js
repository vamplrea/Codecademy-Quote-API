const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, function () {
    console.log(`Server running ${PORT}/`);
});

app.get("/api/quotes/random", (req, res, next) => {
    res.send({ quote: getRandomElement(quotes) });
});

app.get("/api/quotes", (req, res, next) => {
    const { person } = req.query;
    const filterQuotes = quotes.filter((author) => {
        return author.person === person;
    });
    if (person) {
        res.send({ quotes: filterQuotes });
    } else {
        res.status(200).send({ quotes: quotes });
    }
});

app.post("/api/quotes", (req, res) => {
    const { quote } = req.query;
    const { person } = req.query;
    if (quote != "" && person != "") {
        quotes.push({ quote: newQuote, person: newPerson });
        res.send({ quote: { quote: quote, person: person } });
    } else {
        res.sendStatus(400);
    }
});
