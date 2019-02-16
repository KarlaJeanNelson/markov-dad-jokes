import React from 'react';
import {
	AppBar,
	Avatar,
	SvgIcon,
	Toolbar,
	Typography
} from '@material-ui/core';

const Header = props => (
	<header>
		<AppBar color="secondary">
			<Toolbar>
				<Typography align="center" color="inherit">
					markHAov
				</Typography>
			</Toolbar>
		</AppBar>
	</header>
)

export default (Header);
