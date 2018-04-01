import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commonCast: []
    }

    this.compareMovies = this.compareMovies.bind(this);
    this.getRelevantCastData = this.getRelevantCastData.bind(this);
  }

  compareMovies() {
    var ids = this.props.ids;
    var castsInfo = [];
    if (ids.length === 2) {
      axios.get('/compareMovies', { params: { id1: ids[0], id2: ids[1] } })
      .then((response) => {
        response.data.forEach((res) => {
          var movie = JSON.parse(res);
          castsInfo.push(this.getRelevantCastData(movie.cast));
        });
        this.compareCasts(castsInfo)
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  getRelevantCastData(castData) {
    var castMembers = {};
    castData.forEach((cast) => {
      castMembers[cast.name] = cast.character;
    })
    return castMembers;
  }

  compareCasts(casts) {
    var common = [];
    for (var key in casts[0]) {
      if (casts[1].hasOwnProperty(key)) {
        common.push([key, casts[0][key], casts[1][key]]);
      }
    }
    this.setState({ commonCast: common });
  }

  render() {
    const list = this.state.commonCast.map((person, index) =>
      <li key={index}>{person[0]} {person[1]} {person[2]}</li> 
    );

    return (
      <div>
        <button onClick={this.compareMovies}>COMPARE THE MOVIES</button>
        <ul>{list}</ul>
      </div>
    );
  }
}