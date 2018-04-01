import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      results: [],
      id: '',
      title: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getRelevantData = this.getRelevantData.bind(this);
  }

  handleInput(q) {
    this.setState({term: q.target.value, title: q.target.value});
  }

  handleClick(movie) {
    this.setState({results: [], title: `${movie.title} (${movie.year})`});
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
      <li key={index} onClick={ () => { 
        this.props.getID(movie.id); 
        this.handleClick(movie) }}>
        {movie.title} ({movie.year})
      </li> 
    );

    return (
      <div>
        <input type="text" value={this.state.title} onChange={this.handleInput} />
        <button onClick={this.handleSearch}>search</button>
        <ul>{list}</ul>
      </div>
    );
  }
}