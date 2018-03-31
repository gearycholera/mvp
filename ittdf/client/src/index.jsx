import React from 'react';
import ReactDOM from 'react-dom';
import Results from './components/results.jsx';
import SearchContainer from './components/searchcontainer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieIDs: []
    };

    this.setMovieID = this.setMovieID.bind(this);
  }

  setMovieID(id) {
    var updated = this.state.movieIDs.slice();
    updated.push(id);
    this.setState({movieIDs: updated})
  }

  render() {
    return (
      <div>
        <h3>is that the dude from...</h3>
        <SearchContainer getID={this.setMovieID}/>
        <Results />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));