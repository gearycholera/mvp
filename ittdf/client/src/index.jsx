import React from 'react';
import ReactDOM from 'react-dom';
import Results from './components/results.jsx';
import SearchContainer from './components/searchcontainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
    this.setMovieData = this.setMovieData.bind(this);
    this.clearMovieData = this.clearMovieData.bind(this);
  }

  setMovieData(title, id, ind) {
    var updated = this.state.movies.slice();
    updated[ind] = {id: id, title: title};
    this.setState({movies: updated})
  }

  clearMovieData(id, index) {
    var movies = this.state.movies.slice();
    movies.forEach((movie, ind) => {
      if (movie !== null && movie.id === id) movies[ind] = null;
    })
    if (index) movies[index] = null;
    this.setState({ movies: movies })
  }

  render() {
    return (
      <div>
        <h3 id='title'>is that the dude from...</h3>
        <SearchContainer setMovieData={this.setMovieData} clearMovieData={this.clearMovieData}/>
        <Results movies={this.state.movies}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));