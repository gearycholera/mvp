require('../tmdb_api_key');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

var movieSearch = { method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie',
  qs: { 
    include_adult: 'false',
    page: '1',
    query: '',
    language: 'en-US',
    api_key: TMDB_API_KEY
  },
  body: '{}' 
};

app.get('/searchMovie', ((req, res) => {
  movieSearch.qs.query = req.query.title;
  request(movieSearch, function (error, response, body) {
    if (error) throw new Error(error);
    else res.send(body);
  });
}));

var castSearch = { method: 'GET',
  url: '',
  qs: { api_key: TMDB_API_KEY },
  body: '{}' 
};

app.get('/compareMovies', ((req, res) => {
  var output = [];
  var quantity = Object.keys(req.query).length;
  var counter = 0;
  for (var key in req.query) {
    castSearch.url = `https://api.themoviedb.org/3/movie/${req.query[key]}/credits`
    request(castSearch, function (error, response, body) {
      if (error) throw new Error(error);
      else {
        output.push(body);
        counter++;
        if (counter === quantity) res.send(output);
      }
    })
  }
}));

let port = 3000;

app.listen((process.env.PORT || port), function() {
  console.log(`listening on port ${port}`);
});

