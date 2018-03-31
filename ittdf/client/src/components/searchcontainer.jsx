import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './searchbar.jsx';

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Search Box</div>
        <SearchBar />
        <SearchBar />
      </div>
    );
  }
}