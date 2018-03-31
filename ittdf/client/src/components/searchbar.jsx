import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput(q) {
    this.setState({term: q.target.value});
  }

  handleSearch() {
    axios.get('/searchMovie', { params: { title: this.state.term } })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <form> <input type="text" onChange={this.handleInput} /> </form>
        <button onClick={this.handleSearch}>search</button>
      </div>
    );
  }
}