import React, { Component } from 'react';
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';

import Header from '../Header';
import Main from '../Main';

const divStyle = ({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	backgroundColor: 'powderblue',
});

class App extends Component {
	state = {
		jokeList: []
	}

	getJokes = () => {
		axios.get('/api/jokes')
		.then(({data}) => {
			const jokeList = data.map(jokeObj => jokeObj.joke)
			this.setState({
				jokeList
			})
		})
		.catch(err => console.log(err))
	}
	
	componentDidMount() {
		this.getJokes();
	}

  render() {
    return (
			<div style={divStyle}>
				<CssBaseline />
				<Header />
				<Main />
			</div>
    );
  }
}

export default App;
