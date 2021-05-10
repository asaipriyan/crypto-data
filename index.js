var createError = require("http-errors");
var express = require("express");
const PORT = 1997

var app = express();
const listOfCards = require('./src/list-of-cards');
listOfCards.start();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));