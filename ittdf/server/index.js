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

'https://api.themoviedb.org/3/movie/~/credits'

var castSearch = { method: 'GET',
  url: '',
  qs: { 
    api_key: TMDB_API_KEY 
  },
  body: '{}' 
};

app.get('/compareMovies', ((req, res) => {
  var output = [];
  castSearch.url = `https://api.themoviedb.org/3/movie/${req.query.id1}/credits`
  request(castSearch, function (error, response, body) {
    if (error) throw new Error(error);
    else {
      output.push(body);
      castSearch.url = `https://api.themoviedb.org/3/movie/${req.query.id2}/credits`
      request(castSearch, function (error, response, body) {
        if (error) throw new Error(error);
        else {
          output.push(body);
          res.send(output);
        }
      });
    }
  });
}));

let port = 3000;

app.listen((process.env.PORT || port), function() {
  console.log(`listening on port ${port}`);
});

