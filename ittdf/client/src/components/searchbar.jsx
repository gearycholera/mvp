import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      results: [],
      id: ''
    }
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getRelevantData = this.getRelevantData.bind(this);
  }

  handleInput(q) {
    this.setState({term: q.target.value});
  }

  handleSearch() {
    axios.get('/searchMovie', { params: { title: this.state.term } })
      .then((response) => {
        this.setState({results: this.getRelevantData(response.data.results)})
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getRelevantData(movieList) {
    var movies = []
    movieList.forEach((movie) => {
      movies.push({
        title: movie.title,
        year: movie.release_date.slice(0,4),
        id: movie.id
      });
    })
    return movies;
  }

  render() {

    const list = this.state.results.map((movie, index) =>
      <li key={index}>{movie.title} ({movie.year})</li> 
    );

    return (
      <div>
        <form> <input type="text" onChange={this.handleInput} /> </form>
        <button onClick={this.handleSearch}>search</button>
        <ul>{list}</ul>
      </div>
    );
  }
}