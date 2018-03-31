require('../tmdb_api_key');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

let port = 3000;

app.listen((process.env.PORT || port), function() {
  console.log(`listening on port ${port}`);
});

