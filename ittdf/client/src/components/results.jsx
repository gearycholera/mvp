import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commonCast: [] };
    this.compareMovies = this.compareMovies.bind(this);
    this.getRelevantCastData = this.getRelevantCastData.bind(this);
  }

  compareMovies() {
    var castsInfo = [];
    var movieIDs = {};
    var movies = this.props.movies;
    movies.forEach((movie, ind) => {
      if (movie !== null) movieIDs[ind] = movie.id;
    });
    if (Object.keys(movieIDs).length > 1) {
      axios.get('/compareMovies', { params: movieIDs })
      .then((response) => {
        response.data.forEach((res) => {
          var movie = JSON.parse(res);
          castsInfo.push(this.getRelevantCastData(movie.cast));
        });
        this.compareCasts(castsInfo);
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      this.setState({ commonCast: [] });
    }
  }

  getRelevantCastData(castData) {
    var castMembers = {};
    castData.forEach((cast) => {
      castMembers[cast.name] = cast.character;
    })
    return castMembers;
  }

  compareCasts(casts, titles) {
    var common = [];
    var counts = {};
    casts.forEach((cast) => {
      for (var key in cast) counts[key] ? counts[key]++ : counts[key] = 1;
    })
    for (var key in counts) {
      if (counts[key] === casts.length) {
        var intersect = [key + ' played '];
        casts.forEach((cast, ind) => {
          if (ind < casts.length - 1) intersect.push(cast[key] + ' and ')
          else intersect.push(cast[key] )
        })
        common.push(intersect);
      }
    }
    if (common.length < 1) common.push('you were wrong. dead wrong.')
    this.setState({ commonCast: common });
  }

  render() {

    let compareButton;
    var counter = 0;
    for (var i = 0; i < this.props.movies.length; i++) {
      if (this.props.movies[i] !== null) counter++;
      if (counter === 2) {
        compareButton = <button id='comparebtn' onClick={this.compareMovies}>well, i guess we should check.</button>
      }
    }

    const list = this.state.commonCast.map((person, index) =>
      <li key={index}>{person}</li>
    );

    return (
      <div>
        <div id='comparebtnwrap'>
          {compareButton}
        </div>
        <ul>{list}</ul>
      </div>
    );
  }
}