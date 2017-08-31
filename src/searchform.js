import React from 'react';
class SearchForm extends React.Component {
    constructor(props) {
	super(props);
	this.state = {fullname: '', studio: ''};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
	this.setState({[event.target.name]: event.target.value});
	// here we can maybe make suggestions from the db
    }

    handleSubmit(event) {
	alert('Name: ' + this.state.fullname + ' ' + this.state.studio);
	event.preventDefault();
	// here we return the options for checking in
    }

    render() {
	return (
		<form onSubmit={this.handleSubmit}>
        <label>
		Name:
		<input type="text" name="fullname" 
		 value={this.state.fullname} 
		 onChange={this.handleChange} />
        </label>
	<label>
		Studio:
		<input type="text" name="studio"
		value={this.state.studio}
		onChange={this.handleChange} />
	</label>
        <input type="submit" value="Submit" />
      </form>
		);
    }
}

export default SearchForm;