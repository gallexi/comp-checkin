import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import SearchForm from './searchform';

ReactDOM.render(
		<SearchForm />,
		document.getElementById('root')
		);
registerServiceWorker();
