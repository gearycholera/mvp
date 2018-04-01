import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.compareMovies = this.compareMovies.bind(this);
  }

  compareMovies() {
    var ids = this.props.ids;
    if (ids.length === 2) {
      axios.get('/compareMovies', { params: { ids: ids } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.compareMovies}>COMPARE THE MOVIES</button>
      </div>
    );
  }
}