require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Joke = require('./joke.model');

// If a mongoDB is specified in env config, use it.
// Otherwise, use local mongodb.
let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dadjokes';

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });

// Once connected, check to make sure there is data in the database.
// If not, get data from the joke API, and save it to the database.
mongoose.connection.on('connected', () => {
	console.log(`Connected to database ${mongoURI}.`)
})
.then(() => checkForData())
.catch(e => console.log(`Error with mongoose connection.`, e))

mongoose.connection.on('error', (err) => {
	console.log(`Mongo connection error.`, err)
})

const jokeSeeds = [];
const lookupTable = [];
const order = 3;

const checkForData = () => {
	Joke.countDocuments({}, (err, count) => {
		console.log(count);
		if (count < 500) {
			saveData();
		}
	})
	// .then(getTuples())
}

const saveData = (page = 1, jokeData = []) => {
	// console.log(page);
	const config = {
		headers: {
			'Accept': 'application/json',
			'User-Agent': 'https://github.com/KarlaJeanNelson'
		},
		params: {
			page,
			limit: 30
		}
	}
	axios.get('https://icanhazdadjoke.com/search', config)
	.then(({data}) => {
		const retrievedJokes = jokeData.concat(data.results)
		if (data.current_page === data.total_pages) {
			retrievedJokes.forEach(item => {
				const { joke } = item;
				// console.log(joke);
				Joke.findOneAndUpdate({ id: item.id }, { joke }, { upsert: true })
				.catch(e => console.log(e))
			})
			// console.log(`${updates.length} updates, ${errors.length} errors.`);
		} else {
			page++;
			saveData(page, retrievedJokes);
		}
	})
	.catch(e => console.log(`getData error page ${page}`, e))
}

const testTuples = () => {
	// console.log(`in testTuples`);
	Joke.findOne({}, (err, doc) => {
		return err ? ({success: false, error: err}) : doc
	})
	.then(doc => tupleGen(doc))
	.catch(e => console.log(e))
}

const getTuples = () => {
	// console.log(`in getTuples`);
	Joke.find({}, (err, docArr) => {
		return err ? ({ success: false, error: err }) : docArr
	})
	.then(docArr => docArr.forEach(doc => tupleGen(doc)))
	.catch(e => console.log(e))
}

const tupleGen = ({ joke }) => {
	// console.log(`in tupleGen`);
	let text = getText(joke)
	// console.log(`text:`, text);
	getLookupTable(text);
	// console.log(`lookupTable:`, lookupTable);
	getNextWord(getSeed());
}

// TODO: reformat joke strings before saving to clean up inconsistencies.
const getText = joke => {
	return joke.replace(/[^\w\s]|_/g, $1 => ' ' + $1).replace(/[ ]+/g, ' ').split(' ');
}

const getSeed = () => {
	return jokeSeeds[random(jokeSeeds.length - 1)];
}

const getLookupTable = (text) => {
	// console.log(text);
	for (let i = 0; i <= text.length - order; i++) {
		let gram = text.slice(i, i + order);
		if (i === 0) {
			jokeSeeds.push(gram)
			// console.log(`jokeSeeds:`, jokeSeeds);
		}
		
		let nextWd = i === text.length - order ? 'THE_END' : text[i + order]
		lookupTable.push({gram: gram.join(' '), nextWd})
	}
	return lookupTable;
}

const getNextWord = (input) => {
	// console.log(`input:`, input);
	const prevGram = []
	for (let i = order; i > 0; i--) {
		// console.log(input[input.length - i]);
		prevGram.push(input[input.length - i])
	}
	// console.log(`prevGram:`, prevGram);
	const options = lookupTable.filter(item => item.gram === prevGram.join(' '))
	let getNext = options[random(options.length - 1)]
	getNext = getNext.nextWd
	// console.log(`getNext:`, getNext);
	if (getNext === 'THE_END') {
		console.log(`joke:`, input.join(' '));
		return input;
	} else {
		input.push(getNext);
		getNextWord(input, lookupTable)
	}
}

const random = maxNum => (Math.floor(Math.random() * (maxNum + 1)));