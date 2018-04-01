import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './searchbar.jsx';

export default class SearchContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { num: 2 };
    this.addSearchBars = this.addSearchBars.bind(this);
    this.removeSearchBars = this.removeSearchBars.bind(this);
  }

  addSearchBars() {
    if (this.state.num < 5) {
      var num = this.state.num + 1;
      this.setState({num: num});
    }
  }

  removeSearchBars() {
    if (this.state.num > 2) {
      var num = this.state.num - 1;
      this.setState({num: num});
      this.props.clearMovieData(null, num);
    }
  }

  render() {

    const removeButton = [];
    if (this.state.num > 2) {
      removeButton.push(<button key={1} onClick={this.removeSearchBars}>remove movie searchbar</button>)
    }

    const bars = [];
    for (var i = 0 ; i < this.state.num; i++) {
      bars.push(<SearchBar key={i} ind={i} setMovieData={this.props.setMovieData} clearMovieData={this.props.clearMovieData}/>)
    }

    return (
      <div>
        <button onClick={this.addSearchBars}>add movie searchbar</button>
        {removeButton}
        {bars}
      </div>
    );
  }
}