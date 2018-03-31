import React from 'react';
import ReactDOM from 'react-dom';
import Results from './components/results.jsx';
import SearchContainer from './components/searchcontainer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>is that the dude from...</h3>
        <Results />
        <SearchContainer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));