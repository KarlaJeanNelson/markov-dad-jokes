import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
		justifyContent: 'center',
		margin: theme.spacing.unit * 4,
	}
})

const random = maxNum => (Math.floor(Math.random() * (maxNum + 1)));

class Main extends Component {
	state = {
		lookupTable: [],
		jokeSeeds: [],
		newJoke: '',
		order: 3,
	}

	// Get tuples from server.
	getTuples = () => {
		const { order } = this.state;
		axios.get(`/api/jokes/tuples/${order}`)
		.then(({data}) => {
			const { lookupTable, jokeSeeds } = data;
			this.setState({
				lookupTable,
				jokeSeeds
			})
			// console.log(this.state);
		})
		.catch(err => console.log(err))
	}

	// Generate a new joke.
	getJoke = () => {
		const { jokeSeeds } = this.state;
		let seed = jokeSeeds[random(jokeSeeds.length - 1)];
		// console.log(`seed:`, seed);
		this.getNextWord(seed)
		// console.log(`newJoke`, newJoke);
	}

	// Use recursion to build the joke string until next word generated is the end of the joke.
	getNextWord = (input) => {
		const { order, lookupTable } = this.state;
		const prevGram = [];
		for (let i = order; i > 0; i--) {
			prevGram.push(input[input.length - i])
		}
		// console.log(`prevGram:`, prevGram);
		const options = lookupTable.filter(item => item.gram === prevGram.join(' '))
		let getNext = options[random(options.length - 1)]
		getNext = getNext.nextWd;
		// console.log(`getNext:`, getNext);
		if (getNext === 'THE_END') {
			// console.log(`joke:`, input.join(' '));
			let newJoke = input.join(' ');
			newJoke = newJoke.replace(/\s+(\W)/g, "$1");
			this.setState({
				newJoke: newJoke
			});
			// console.log(this.state);
			return input;
		} else {
			input.push(getNext);
			this.getNextWord(input)
		}
	}
	
	componentDidMount() {
		this.getTuples();
	}

  render() {
		const { classes } = this.props;
		const { lookupTable, jokeSeeds, newJoke } = this.state;
    return (
			<Fragment>
				<Toolbar />
				<Card classes={{ root: classes.root }}>
					<CardContent className={classes.jokeContainer}>
						<Typography variant="h4" align="center">{newJoke}</Typography>
					</CardContent>
					<CardContent>
						<Grid container spacing={16} direction="row" justify="center" alignItems="center">
							<Grid item>
								<Button
									variant="contained"
									size="large"
									color="secondary"
									disabled={!lookupTable.length > 0 && !jokeSeeds.length > 0}
									onClick={e => this.getJoke(e)}
								>
									generate dad joke
								</Button>
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
    );
  }
}

Main.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default compose(
	withStyles(styles),
	withWidth(),
)(Main);