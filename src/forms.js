import React from 'react';
import SearchForm from './searchform'
import SelectForm from './selectform'

class Forms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: 'search', searchResults: []};
    this.handoffSearchResults = this.handoffSearchResults.bind(this);
    this.startOver = this.startOver.bind(this);
  }

  handoffSearchResults(results) {
    this.setState({value: 'select', searchResults: results.data})
  }

  startOver() {
    this.setState({value: 'search', searchResults: []});
  }

  render() {
    let state = this.state.value;
    const url = 'http://localhost:3001/api/dancers';

    switch (state) {
      case 'search':
        return <div className="container"><SearchForm handoffSearchResults={this.handoffSearchResults} url={url} /></div>
      case 'select':
        return <div className="container"><SelectForm searchResults={this.state.searchResults} startOver={this.startOver} url={url} /></div>
      default:
        return null;
    }
  }
}

export default Forms;
