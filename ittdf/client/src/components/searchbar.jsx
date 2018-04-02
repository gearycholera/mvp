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
      clear: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInput(q) {
    this.setState({ term: q.target.value });
  }

  handleClick(movie) {
    this.setState({ 
      results: [], 
      clear: true, 
      term: `${movie.title} (${movie.year})`, 
      id: movie.id 
    });
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') this.handleSearch();
  }

  handleSearch() {
    if (this.state.term !== '') {
      axios.get('/searchMovie', { params: { title: this.state.term } })
        .then((response) => {
          this.setState({results: this.getRelevantData(response.data.results)});
        })
        .catch((err) => { console.log(err) })
    }
  }

  handleClear() {
    this.setState({ term: '', clear: false });
    this.props.clearMovieData(this.state.id)
  }

  getRelevantData(movieList) {
    var movies = [];
    movieList.forEach((movie) => {
      movies.push({
        title: movie.title,
        year: movie.release_date.slice(0,4),
        id: movie.id
      });
    });
    return movies;
  }

  render() {

    let buttonSwitch = <button id='searchbtn' onClick={this.handleSearch}>search</button>
    if (this.state.clear) {
      buttonSwitch = <button id='clearbtn' onClick={this.handleClear}>clear</button>
    }

    const list = this.state.results.map((movie, index) =>
      <li key={index} onClick={ () => { 
        this.props.setMovieData(movie.title, movie.id, this.props.ind); 
        this.handleClick(movie) }}>
        {movie.title} ({movie.year})
      </li> 
    );

    return (
      <div>
        <div id='searchline'>
          <input id='searchbox' type="text" value={this.state.term} onChange={this.handleInput} onKeyPress={this.handleKeyPress}/>
          {buttonSwitch}
        </div>
        <ul id='searchresults'>{list}</ul>
      </div>
    );
  }
}