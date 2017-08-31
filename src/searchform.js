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
	// here we can maybe make suggestions from the db
    }

    handleSubmit(event) {
       	event.preventDefault();
	let name = this.state.fullname.trim();
	let studio = this.state.studio.trim();

	axios.get(this.props.url, {params: {name: name, studio: studio}})
	    .then(res => {
		    this.props.displaySearchResults(res); //change the state prolly idk
		})
	    .catch(err => {
		    console.error(err);
	});
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