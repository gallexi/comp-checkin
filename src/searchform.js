import React from 'react';
import axios from 'axios';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {fullname: '', studio: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
	   this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let fullname = this.state.fullname.trim();
    let studio = this.state.studio.trim();

    axios.get(this.props.url, {params: {fullname: fullname, studio: studio}})
      .then(res => {
        this.props.handoffSearchResults(res);
      })
	    .catch(err => {
        console.error(err);
      }
    );
  }

  render() {
    return (
	    <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Enter name and/or studio or school affiliation</label>
          <div className="control">
            <input type="text" name="fullname"
                   className="input is-primary"
	                 value={this.state.fullname}
                   placeholder="Name"
                   onChange={this.handleChange} />
          </div>
          <div className="control">
            <input type="text" name="studio"
                   className="input is-primary"
	                 value={this.state.studio}
                   placeholder="Affiliation"
                   onChange={this.handleChange} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input className="button is-primary" type="submit" value="Search" />
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;
