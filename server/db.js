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

const lookupTable = new Map();
const jokeSeeds = [];
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
				.then(result => getTuples(result.joke))
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

const checkForData = () => {
	Joke.countDocuments({}, (err, count) => {
		console.log(count);
		if (count < 500) {
			saveData();
		}
	})
	
	Joke.findOne({})
	.then(result => testTupleGen(result))
}

const getTuples = (joke, order = 3) => {
	Joke.findOne({})
	// .then(result => console.log(result))
}

const testTupleGen = (jokeDoc) => {
	console.log(`in testTupleGen`);
	const { joke } = jokeDoc;
	let text = joke.replace(/[^\w\s]|_/g, $1 => ' ' + $1).replace(/[ ]+/g, ' ').split(' ');
	// console.log(text);
	const myLookupTable = getLookupTable(text)
	console.log(`lookupTable:`, myLookupTable);
	let seed = jokeSeeds[random(jokeSeeds.length - 1)];
	seed = seed.join(' ')
	console.log(`seed:`, seed);
	const options = myLookupTable.filter(item => item.gram === seed)
	let getNext = options[random(options.length - 1)]
	console.log(getNext.nextWd);
	getNextWord(seed);
}

const getLookupTable = (text, order = 2) => {
	console.log(text);
	const myArr = [];
	for (let i = 0; i <= text.length - order; i++) {
		let gram = text.slice(i, i + order);
		let nextWd = 'END';
		if (i === 0) {
			jokeSeeds.push(gram)
			console.log(`jokeSeeds:`, jokeSeeds);
		}
		
		if (i === text.length - order) {
			lookupTable.set(gram, 'END')
		} else {
			nextWd = text[i + order]
			lookupTable.set(gram, text[i + order])
		}
		myArr.push({gram: gram.join(' '), nextWd})
	}
	return myArr;
}

const getNextWord = input => {
	console.log(`input:`, input);
}

const random = maxNum => (Math.floor(Math.random() * maxNum));

const getNext = (lookupTable, current, sentence = []) => {
	lookupTable.filter(item => Object.keys(item) === current)
}