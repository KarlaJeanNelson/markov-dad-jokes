import React from 'react';
import { CssBaseline } from '@material-ui/core';

import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

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
		<Footer />
	</div>
)

export default App;
