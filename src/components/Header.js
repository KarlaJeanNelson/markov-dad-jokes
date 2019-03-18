import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Avatar,
	Toolbar,
	Typography
} from '@material-ui/core';

const styles = theme => ({
	avatar: {
		backgroundColor: 'white',
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	heading: {
		color: theme.palette.primary.light,
		fontFamily: `'Karla', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
		fontWeight: theme.typography.fontWeightLight
	},
	toolbar: {
		padding: theme.spacing.unit
	}
})

const Header = ({ classes }) => (
	<header>
		<AppBar color="secondary">
			<Toolbar className={classes.toolbar}>
				<Avatar className={classes.avatar}>
					<img src="/logo.svg" alt="M" />
				</Avatar>
				<Typography align="center" color="primary" variant="h5" className={classes.heading}>
					mark<b>HA</b>ov
				</Typography>
			</Toolbar>
		</AppBar>
	</header>
)

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);