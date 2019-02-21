import React from 'react';
import { CssBaseline } from '@material-ui/core';

import Header from '../Header';
import Main from '../Main';

const divStyle = ({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	backgroundColor: 'powderblue',
});

const App = () => (
	<div style={divStyle}>
		<CssBaseline />
		<Header />
		<Main />
	</div>
)

export default App;
