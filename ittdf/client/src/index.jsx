import React from 'react';
import ReactDOM from 'react-dom';
import Results from './components/results.jsx';
import SearchContainer from './components/searchcontainer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie1: '',
      movie2: ''
    };
  }

  render() {
    return (
      <div>
        <h3>is that the dude from...</h3>
        <SearchContainer/>
        <Results />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));