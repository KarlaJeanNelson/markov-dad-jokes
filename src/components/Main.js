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
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		height: '100%',
		margin: theme.spacing.unit * 2
	},
})

const moreStyles = ({
	grow: {
		flexGrow: 1,
	}
})

const Main = ({ classes }) => {
	return (
		<Fragment>
			<Toolbar />
			<Card classes={{ root: classes.root }}>
				<CardContent style={moreStyles.grow}>
				</CardContent>
				<CardContent>
					<Grid container spacing={16} direction="row" justify="center" alignItems="center">
						<Grid item>
							<Button variant="contained" size="large" color="secondary">generate dad joke</Button>
						</Grid>
						<Hidden smDown>
							<Grid item style={moreStyles.grow}>
								<Typography align="right">Good one! Save it!</Typography>	
							</Grid>
						</Hidden>
						<Grid item>
							<Fab>
								<SaveIcon />
							</Fab>
						</Grid>
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