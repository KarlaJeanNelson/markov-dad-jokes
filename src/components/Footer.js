import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
	Grid,
	Typography
} from '@material-ui/core';
import { Copyright } from '@material-ui/icons'

const styles = theme => ({
	container: {
		marginBottom: theme.spacing.unit,
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
	},
	heading: {
		color: theme.palette.primary.light,
		fontFamily: `'Karla', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
		fontWeight: theme.typography.fontWeightLight
	},
	icon: {
		height: theme.typography.captionNext.fontSize,
		width: theme.typography.captionNext.fontSize
	},
	item: {
		display: 'flex',
		flexFlow: 'row nowrap'
	},
	text: {
		marginLeft: theme.spacing.unit
	}
})

const Footer = ({ classes }) => (
	<footer>
		<Grid container
			spacing={8}
			justify="center"
			wrap="wrap"
			classes={{ container: classes.container }}
		>
			<Grid item classes={{ item: classes.item }}>
				<Copyright className={classes.icon} />
				<Typography variant="caption" className={classes.text}>
					2019 Karla Jean Nelson all rights reserved;
				</Typography>
			</Grid>
			<Grid item classes={{ item: classes.item }}>
				<img src="/logo.svg" alt="icon" className={classes.icon} />
				<Typography variant="caption" className={classes.text}>
					icon by	<a href="www.freepik.com">Freepik</a> from <a href="www.flaticon.com">flaticon.com</a>;
				</Typography>
			</Grid>
			<Grid item classes={{ item: classes.item }}>
				<img src="/GitHub-Mark-32px.png" alt="GitHub icon" className={classes.icon} />
				<Typography variant="caption" className={classes.text}>
					<a href="https://github.com/KarlaJeanNelson/markov-dad-jokes">source code</a>
					&#0020;on&#0020;
					<a href="https://github.com">GitHub</a>
				</Typography>
			</Grid>
		</Grid>
	</footer>
)

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);