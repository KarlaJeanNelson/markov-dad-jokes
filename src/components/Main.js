import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import {
	Button,
	Card,
	CardContent,
	Fab,
	Grid,
	Hidden,
	Toolbar,
	Typography,
	withWidth
} from '@material-ui/core';
import { 
	ThumbUp,
	ThumbDown
} from '@material-ui/icons';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		height: '100%',
		margin: theme.spacing.unit * 2
	},
	jokeContainer: {
		display: 'flex',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

const Main = ({ classes }) => {
	return (
		<Fragment>
			<Toolbar />
			<Card classes={{ root: classes.root }}>
				<CardContent className={classes.jokeContainer}>
					<Typography>joke</Typography>
				</CardContent>
				<CardContent>
					<Grid container spacing={16} direction="row" justify="center" alignItems="center">
						<Grid item>
							<Button variant="contained" size="large" color="secondary">generate dad joke</Button>
						</Grid>

						<Hidden smDown>
							<Grid item style={{ flexGrow: 1 }}>
								<Typography align="right">Good one! Save it!</Typography>	
							</Grid>
						</Hidden>
						<Grid item>
							<Fab>
								<ThumbUp />
							</Fab>
						</Grid>
						
						<Grid item>
							<Fab>
								<ThumbDown />
							</Fab>
						</Grid>
						<Hidden smDown>
							<Grid item>
								<Typography align="right">Try again, dad.</Typography>	
							</Grid>
						</Hidden>

					</Grid>
				</CardContent>
			</Card>
		</Fragment>
	)
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default compose(
	withStyles(styles),
	withWidth(),
)(Main);