require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Joke = require('./joke.model');
const Markov = require('markov-strings')

// If a mongoDB is specified in env config, use it.
// Otherwise, use local mongodb.
let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dadjokes';

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
	console.log(`Connected to database ${mongoURI}.`)
})
.then(() => getData())
.catch(e => console.log(`Error with mongoose connection.`, e))


mongoose.connection.on('error', (err) => {
	console.log(`Mongo connection error.`, err)
})

const tokens = [];

const getData = (page = 1, jokeData = [], order = 2) => {
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
			// const errors = [];
			// const updates = [];
			const jokeSeeds = [];
			const text = retrievedJokes[0].joke.split(' ');
			const lookupTable = []
			// console.log(text);
			for (let i = 0; i <= text.length - order; i++) {
				let gram = text.slice(i, i + order)
				if (i === 0) {
					jokeSeeds.push(gram)
				}
				
				if (i === text.length - order) {
					lookupTable[gram] = 'END'
				} else {
					lookupTable[gram] = text[i + order]
				}
			}
			console.log(lookupTable, jokeSeeds );
			const jokeStart = jokeSeeds[random(jokeSeeds.length - 1)];
			console.log(Object.keys(lookupTable))
			console.log(lookupTable[jokeStart]);
			console.log(getNext(lookupTable, jokeStart));
			// retrievedJokes.forEach(item => {
			// 	const { joke } = item;
			// 	console.log(joke);
			// 	Joke.findOneAndUpdate({ id: item.id }, { joke }, { upsert: true }, (err, doc) => (
			// 		err ? errors.push(err) : updates.push(doc)
			// 	))
			// })
			// console.log(`${updates.length} updates, ${errors.length} errors.`);
		} else {
			page++;
			getData(page, retrievedJokes);
		}
	})
	.catch(e => console.log(`getData error page ${page}`, e))
}

const random = maxNum => (Math.floor(Math.random() * maxNum));

const getNext = (lookupTable, current, sentence = []) => {
	lookupTable.filter(item => Object.keys(item) === current)
}