import React from 'react';
import axios from 'axios';

class SelectForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {total: 0, value: 'select'}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
     var options = event.target.options;
     var dancersSelected = [];
     var total = 0;
     for (var i = 0, l = options.length; i < l; i++) {
       if (options[i].selected) {
         total += parseInt(options[i].getAttribute('data-owed'), 10);
         dancersSelected.push(options[i].value);
       }
     }
     this.setState({selected: dancersSelected, total: total});
  }

  handleSubmit(event) {
    event.preventDefault();

    var dancersSelected = this.state.selected;
    axios.put(this.props.url, {params: {dancers: dancersSelected}})
      .then(res => {
        this.setState({value: 'thank'})
      })
	    .catch(err => {
        console.error(err);
      }
    );
  }

  render() {
    const searchResults = this.props.searchResults

    const dancerList = searchResults.map((result) => result.checkedin ?
        <option disabled value={result._id} data-owed={result.owed} key={result._id}>{result.fullname} with {result.studio}</option>
        :
        <option value={result._id} data-owed={result.owed} key={result._id}>{result.fullname} with {result.studio}</option>
    )

    const selectDancers =
      <div className='container'>
        <div className='columns'>
          <div className='column is-half is-offset-one-quarter'>
      	    <form onSubmit={this.handleSubmit}>
              <div className='field'>
                <div className='label'>Select dancers to check in</div>
                <div className='control'>
                  <div className='select is-multiple'>
                    <select multiple size={dancerList.length} onChange={this.handleChange}>
                      {dancerList}
                    </select>
                  </div>
                </div>
              </div>
              <h1> Total owed: {this.state.total} </h1>
              <div className="field">
                <div className="control">
                  <input type="submit" value="Check in" className="button is-primary" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    const thankYou =
      <div className='container'>
        <div className='columns'>
          <div className='column is-half is-offset-one-quarter'>
            <h1> Dancers successfully checked in! </h1>
            <button className="button is-primary" onClick={this.props.startOver}> Start Over </button>
          </div>
        </div>
      </div>

    return this.state.value === 'select' ? selectDancers : thankYou
  }
}

export default SelectForm;
